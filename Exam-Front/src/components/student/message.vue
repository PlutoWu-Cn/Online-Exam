// 给我留言页面
<template>
  <div id="message">
    <div class="title"></div>
    <div class="wrapper bg-white rounded-3xl mb-8 ">
      <div class="title1">
        <el-input
          placeholder="留言标题"
          v-model="title"
          clearable>
        </el-input>
      </div>
      <div class="content">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="留言内容"
          v-model="content"
          clearable>
        </el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="submit()">提交留言</el-button>
      </div>
      <div class="all">
        <ul class="msglist">
          <li class="list" 
          @mouseenter="enter(index)" 
          @mouseleave="leave(index)"
          v-for="(data,index) in msg" :key="index"
          >
            <p class="title"> <i class="iconfont icon-untitled33"></i>{{data.title}}</p>
            <p class="content">{{data.content}}</p>
            <p class="date"><i class="iconfont icon-date"></i>{{data.time}}</p>
            <div v-for="(replayData,index2) in data.replays" :key="index2">
              <p class="comment"><i class="iconfont icon-huifuxiaoxi"></i>{{replayData.replay}}</p>
            </div>
            <span class="replay" @click="replay(data.id)" v-if="flag && index == current">Comment</span>
          </li>
        </ul>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current"
          :page-sizes="[4,6,8,10]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'message'
  data() {
    return {
      flag: false,
      current: 0,
      title: "",
      content: "",
      pagination: { //分页后的留言列表
        current: 1, //当前页
        total: null, //记录条数
        size: 4 //每页条数
      },
      msg: []
    }
  },
  created() {
    this.getMsg()
  },
  // watch: {
    
  // },
  methods: {
    getMsg() {
      this.$axios(`/api/messages/${this.pagination.current}/${this.pagination.size}`).then(res => {
        let status = res.data.code
        if(status == 200) {
          this.msg = res.data.data.records
          this.pagination = res.data.data
        }
      })
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val
      this.getMsg()
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getMsg()
    },
    // formatTime(date) { //日期格式化
    //   let year = date.getFullYear()
    //   let month= date.getMonth()+ 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    //   let day=date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    //   let hours=date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    //   let minutes=date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    //   let seconds=date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    //   // 拼接
    //   return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    // },
    submit() {
      let date = new Date()
      if(this.title.length == 0 || this.content.length == 0) { //非空判断
        this.$message({
          type: 'error',
          message: '留言标题或内容不能为空',
        })
       } else {
      this.$axios({
        url: "/api/message",
        method: "post",
        data: {
          title: this.title,
          content: this.content,
          time: date
        }
      }).then(res => {
        let code = res.data.code
        if(code == 200) {
          this.$message({
            type: "success",
            message: "留言成功"
          })
        }
        this.getMsg()
      })
    }
      this.title = ""
      this.content = ""
      this.getMsg()
    },
    replay(messageId) { //回复留言功能
      this.$prompt('回复留言', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: '回复不能为空'
      }).then(({ value }) => {
        let date = new Date()
        console.log(messageId)
        this.$axios({
          url: '/api/replay',
          method: 'post',
          data: {
            replay: value,
            replayTime: date,
            messageId: messageId
          }
        }).then(res => {
          this.getMsg()
        })
        this.$message({
          type: 'success',
          message: '回复成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    },
    enter(index) {
      this.flag = true
      this.current = index
    },
    leave(index) {
      this.flag = false;
      this.current = index;
    }
  }
}
</script>
<style scoped>
@import '../../assets/css/message.scss';
</style>