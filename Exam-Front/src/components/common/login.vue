<!-- 用户登录界面 -->
<template>
  <div id="login">
    
    <div class="bg"></div>
    <el-row class="main-container">
      <el-col :lg="8" :xs="16" :md="10" :span="10">
        <div class="top">
          
        </div>
        <div class="bottom mt-12 rounded-3xl">
          <div class="container ">
            <p class="title">账号登录</p>
            <el-form
              :label-position="labelPosition"
              label-width="70px" 
              :model="formLabelAlign"
              :rules="rules"
              ref="formLabelAlign"
            >
              <el-form-item label="用户名" prop="username" class="ml-7">
                <el-input
                  v-model.number="formLabelAlign.username"
                  placeholder="请输入用户名" class="w-80 "
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" class="ml-7">
                <el-input
                  v-model="formLabelAlign.password"
                  placeholder="请输入密码" class="w-80"
                  type="password"
                  @keyup.enter.native="login('formLabelAlign')" 
                ></el-input>
                <el-form-item prop="code" class="mt-6 h-5 w-80">
                  <el-row :span="24">
                    <el-col :span="16">
                      <el-input
                        v-model="formLabelAlign.code"
                        auto-complete="off"
                        placeholder="请输入验证码"
                        size=""
                        @keyup.enter.native="login('formLabelAlign')"
                      ></el-input>
                    </el-col>
                    <el-col :span="8">
                      <div class="login-code ml-0 " @click="refreshCode">
                        <!--验证码组件-->
                        <SIdentify :identifyCode="identifyCode"></SIdentify>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form-item >
              <el-checkbox v-model="checked" class="ml-24">记住密码</el-checkbox>
              <div class="submit">
                <el-button
                  type="primary"
                  class="row-login"
                  @click="login('formLabelAlign')"
                  >登录</el-button
                >
              </div>
              <!-- <div class="options">
                <p class="find"><a href="javascript:;">找回密码</a></p>
                <div class="register">
                  <span>没有账号?</span>
                  <span><a href="javascript:;">去注册</a></span>
                </div>
              </div> -->
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="footer">
      <el-col>
        <p class="msg2">
          版权所有 ©2019
          <!--重庆文理学院计科2班余晓江-->
          保留所有权利 渝ICP备19001371号
        </p>
      </el-col>
    </el-row>
    
    <section class="remind">
      <span>管理员账号：9527</span>
      <span>教师账号：20081001</span>
      <span>密码都是：123456</span>
    </section>
  </div>
</template>

<script>
import store from "@/vuex/store";
import { mapState } from "vuex";
import SIdentify from "./identify";

export default {
  store,
  name: "login",

  components: {
    SIdentify: SIdentify,
  },
  data() {
    return {
      role: 2,
      checked: true,
      identifyCodes: "1234567890",
      identifyCode: "",
      userData: [],
      labelPosition: "left",
      formLabelAlign: {
        username: "20154084",
        password: "123456",
        code: "",
        // username: "",
        // password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //页面加载调用获取cookie值
  mounted() {
    this.getCookie();
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    console.log("identifyCode", this.identifyCode);
  },
  methods: {
    //用户登录请求后台处理
    login(formName) {
      console.log("formLabelAlign.code", this.formLabelAlign.code);
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          //判断复选框是否被勾选 勾选则调用配置cookie方法
          if (self.checked == true) {
            console.log("checked == true");
            //传入账号名，密码，和保存天数3个参数
            self.setCookie(
              self.formLabelAlign.username,
              self.formLabelAlign.password,
              7
            );
          } else {
            console.log("清空Cookie");
            //清空Cookie
            self.clearCookie();
          }
          console.log("登陆成功");
          console.log("登录操作执行-------");
          this.$axios({
            url: `/api/login`,
            method: "post",
            data: {
              ...this.formLabelAlign,
            },
          }).then((res) => {
            let resData = res.data.data;
            console.log("resData", resData);
            if (this.formLabelAlign.code != this.identifyCode) {
              alert("验证码错误");
            }
            if (
              resData != null &&
              this.formLabelAlign.code === this.identifyCode
            ) {
              switch (resData.role) {
                case "0": //管理员
                  this.$cookies.set("cname", resData.adminName);
                  this.$cookies.set("cid", resData.adminId);
                  this.$cookies.set("role", 0);
                  this.$router.push({ path: "/index" }); //跳转到首页
                  break;
                case "1": //教师
                  this.$cookies.set("cname", resData.teacherName);
                  this.$cookies.set("cid", resData.teacherId);
                  this.$cookies.set("role", 1);
                  this.$router.push({ path: "/index" }); //跳转到教师用户
                  break;
                case "2": //学生
                  this.$cookies.set("cname", resData.studentName);
                  this.$cookies.set("cid", resData.studentId);
                  this.$router.push({ path: "/student" });
                  break;
              }
            }
            if (resData == null) {
              //错误提示
              this.$message({
                showClose: true,
                type: "error",
                message: "用户名或者密码错误",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // console.log("登录操作执行-------");
      // this.$axios({
      //   url: `/api/login`,
      //   method: "post",
      //   data: {
      //     ...this.formLabelAlign,
      //   },
      // }).then((res) => {
      //   let resData = res.data.data;
      //   if (resData != null) {
      //     switch (resData.role) {
      //       case "0": //管理员
      //         this.$cookies.set("cname", resData.adminName);
      //         this.$cookies.set("cid", resData.adminId);
      //         this.$cookies.set("role", 0);
      //         this.$router.push({ path: "/index" }); //跳转到首页
      //         break;
      //       case "1": //教师
      //         this.$cookies.set("cname", resData.teacherName);
      //         this.$cookies.set("cid", resData.teacherId);
      //         this.$cookies.set("role", 1);
      //         this.$router.push({ path: "/index" }); //跳转到教师用户
      //         break;
      //       case "2": //学生
      //         this.$cookies.set("cname", resData.studentName);
      //         this.$cookies.set("cid", resData.studentId);
      //         this.$router.push({ path: "/student" });
      //         break;
      //     }
      //   }
      //   if (resData == null) {
      //     //错误提示
      //     this.$message({
      //       showClose: true,
      //       type: "error",
      //       message: "用户名或者密码错误",
      //     });
      //   }
      // });
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.formLabelAlign.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.formLabelAlign.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    clickTag(key) {
      this.role = key;
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      console.log("identifyCode", this.identifyCode);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
  },
  computed: mapState(["userInfo"]),
};
</script>

<style lang="scss" scoped>
.remind {
  border-radius: 4px;
  padding: 10px 20px;
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 50%;
  flex-direction: column;
  color: #606266;
  background-color: #fff;
  border-left: 4px solid #409eff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.container {
  margin-bottom: 32px;
}
.container .el-radio-group {
  margin: 30px 0px;
}
a:link {
  color: #ff962a;
  text-decoration: none;
}
#login {
  font-size: 14px;
  color: #000;
  background-color: #fff;
}
#login .bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  background: url("../../assets/img/loginbg.jpg") center top / cover no-repeat;
  background-color: #b6bccdd1 !important;
}
#login .main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
#login .main-container .top {
  margin-top: 100px;
  font-size: 30px;
  color: #ff962a;
  display: flex;
  justify-content: center;
}
#login .top .icon-kaoshi {
  font-size: 80px;
}
#login .top .title {
  margin-top: 20px;
}
#login .bottom {
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  // opacity: 0.8;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#login .bottom .title {
  text-align: center;
  font-size: 30px;
}
.bottom .container .title {
  margin: 30px 0px;
}
.bottom .submit .row-login {
  width: 50%;
  background-color: #4380c2;
  border-color: #aacff7;
  margin: 20px 0px 10px 0px;
  padding: 15px 20px;
}
.bottom .submit {
  display: flex;
  justify-content: center;
}
.footer {
  margin-top: 50px;
  text-align: center;
}
.footer .msg1 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 15px;
}
.footer .msg2 {
  font-size: 14px;
  color: #e3e3e3;
  margin-top: 70px;
}
.bottom .options {
  margin-bottom: 40px;
  color: #ff962a;
  display: flex;
  justify-content: space-between;
}
.bottom .options > a {
  color: #ff962a;
}
.bottom .options .register span:nth-child(1) {
  color: #8c8c8c;
}
</style>
