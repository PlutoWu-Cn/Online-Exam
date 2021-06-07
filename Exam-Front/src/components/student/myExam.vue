// 我的试卷页面
<template>



  <div id="myExam" >
    <div class="title m-2.5"></div>
    <div class="wrapper bg-white rounded-3xl mb-6 ">
      <ul class="top flex">
        <li class="order cursor-pointer ">试卷列表</li>
        <li class="search-li"><div class="icon"><input type="text" placeholder="试卷名称" class="search " v-model="key"><i class="el-icon-search"></i></div></li>
        <li><el-button type="primary" @click="search()">搜索试卷</el-button></li>
      </ul>
      <ul class="paper" v-loading="loading">
        <li class="item" v-for="(item,index) in pagination.records" :key="index">
          <h4 @click="toExamMsg(item.examCode)" class="cursor-pointer">{{item.source}}</h4>
          <p class="name text-base text-gray-500">{{item.source}}-{{item.description}}</p>
                    <p class="text-gray-400 text-xs">开始时间：{{ item.startTime }}</p>
          <p class="text-gray-400 text-xs">结束时间：{{ item.endTime }}</p>
          <div class="info text-xs text-gray-500">
            <i class="iconfont icon-icon-time"></i><span v-if="item.totalTime != null">限时{{item.totalTime}}分钟</span>
            <i class="iconfont icon-fenshu"></i><span>满分{{item.totalScore}}分</span>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current"
          :page-sizes="[6, 10, 20, 40]"
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
  // name: 'myExam'
  data() {
    return {
      loading: false,
      key: null, //搜索关键字
      allExam: null, //所有考试信息
      pagination: { //分页后的考试信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6 //每页条数
      }
    }
  },
  created() {
    this.getExamInfo()
    this.loading = true
  },
  // watch: {
    
  // },
  methods: {
    //获取当前所有考试信息
    getExamInfo() {
      this.$axios(`/api/exams/${this.pagination.current}/${this.pagination.size}`).then(res => {
        this.pagination = res.data.data
        this.loading = false
        console.log(this.pagination)
      }).catch(error => {
        console.log(error)
      })
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val
      this.getExamInfo()
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getExamInfo()
    },
    //搜索试卷
    search() {
      this.$axios('/api/exams').then(res => {
        if(res.data.code == 200) {
          let allExam = res.data.data
          let newPage = allExam.filter(item => {
            return item.source.includes(this.key)
          })
          this.pagination.records = newPage
        }
      })
    },
    //跳转到试卷详情页
    toExamMsg(examCode) {
      this.$router.push({path: '/examMsg', query: {examCode: examCode}})
      console.log(examCode)
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/myExam.scss';
</style>