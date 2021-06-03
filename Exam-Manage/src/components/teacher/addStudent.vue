<!-- 添加学生 -->
<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="80px" :rules="addstuules">
      <el-form-item label="姓名" prop="studentName">
        <el-input v-model="form.studentName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="form.sex"></el-input>
      </el-form-item>
      <el-form-item label="学院" prop="institute">
        <el-input v-model="form.institute"></el-input>
      </el-form-item>
      <el-form-item label="所属专业" prop="major">
        <el-input v-model="form.major"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-input v-model="form.grade"></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="clazz">
        <el-input v-model="form.clazz"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="tel">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="cardId">
        <el-input v-model="form.cardId"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button type="text" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  data() {
    var checkemail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback();
      }
      return callback(new Error("邮箱不合法"));
    };
    // 验证手机号的规则
    var checkemobile = (rule, value, callback) => {
      const regmobile = /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/;
      if (regmobile.test(value)) {
        // 合法邮箱
        return callback();
      }
      return callback(new Error("手机号不合法"));
    };
    return {
      form: {
        //表单数据初始化
        studentName: null,
        grade: null,
        major: null,
        clazz: null,
        institute: null,
        tel: null,
        email: null,
        pwd: null,
        cardId: null,
        sex: null,
        role: 2
      },
      addstuules: {
        studentName: { required: true, message: "必填", trigger: "blur" },
        grade: { required: true, message: "必填", trigger: "blur" },
        major: { required: true, message: "必填", trigger: "blur" },
        clazz: { required: true, message: "必填", trigger: "blur" },
        institute: { required: true, message: "必填", trigger: "blur" },
        tel: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: checkemobile, trigger: "blur" }
        ],
        email: [
          { validator: checkemail, trigger: "blur" },
          { required: true, message: "必填", trigger: "blur" }
        ],
        pwd: { required: true, message: "必填", trigger: "blur" },
        cardId: { required: true, message: "必填", trigger: "blur" },
        sex: { required: true, message: "必填", trigger: "blur" }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return this.$message.error("请按照提示填入数据");
        //数据提交
        this.$axios({
          url: "/api/student",
          method: "post",
          data: {
            ...this.form
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "数据添加成功",
              type: "success"
            });
            this.$router.push({ path: "/studentManage" });
          }
        });
      });
    },
    cancel() {
      //取消按钮
      this.form = {};
    }
  }
};
</script>
<style lang="scss" scoped>
.add {
  padding: 0px 40px;
  width: 400px;
}
</style>
