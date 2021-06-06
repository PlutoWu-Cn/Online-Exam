// 我的考试页面
<template>
  <div id="myExam" v-loading="loading" >
    <div class="title"></div>
    <div class="wrapper bg-white rounded-3xl mb-8">
      <ul class="top">
        <li class="order">
          <el-badge :value="num_all" class="item" type="primary">
            <span @click="getExamInfo">全部</span>
          </el-badge>
        </li>
        <li class="order">
          <el-badge :value="num_nots" class="item" type="primary">
            <span @click="showNotStarted">未开始</span>
          </el-badge>
        </li>
        <li class="order">
          <el-badge :value="num_s" class="item" type="primary">
            <span @click="showStarted">已开始</span>
          </el-badge>
        </li>
        <li class="order">
          <el-badge :value="num_o" class="item">
            <span @click="showOverdue">已过期</span>
          </el-badge>
        </li>
        <li class="search-li">
          <div class="icon">
            <input
              type="text"
              placeholder="试卷名称"
              class="search"
              v-model="key"
            /><i class="el-icon-search"></i>
          </div>
        </li>
        <li>
          <el-button type="primary" @click="search()">搜索试卷</el-button>
        </li>
      </ul>
      <ul class="paper" v-loading="loading">
        <!-- <li
          class="item"
          v-for="(item, index) in pagination.records"
          :key="index"
        > -->

        <li
          class="item"
          v-for="(item, index) in this.examrecord.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          )"
          :key="index"
        >
          <h4 @click="toExamMsg(item.examCode)">{{ item.source }}</h4>
          <span class="name">{{ item.source }}-{{ item.description }}</span>
          <p class="text-gray-400 text-xs">开始时间：{{ item.startTime }}</p>
          <p class="text-gray-400 text-xs">结束时间：{{ item.endTime }}</p>
          <div class="info">
            <!-- <i class="el-icon-loading"></i
            > -->
            <!-- <span>{{ item.examDate.substr(0, 10) }}</span> -->
            <i class="iconfont icon-icon-time"></i
            ><span v-if="item.totalTime != null"
              >限时{{ item.totalTime }}分钟</span
            >
            <i class="iconfont icon-fenshu"></i
            ><span>满分{{ item.totalScore }}</span>
          </div>
        </li>
      </ul>
     

      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../vuex/store";
import { mapState, mapMutations, mapGetters } from "vuex";
import CompareDate from '../../plugins/dateformat';
export default {
  // name: 'myExam'
  data() {
    return {
      exams: null,
      num_all: null, //全部试卷
      num_nots: null, //未开始的试卷数
      num_s: null, //已开始的试卷数
      num_o: null, //已过期的试卷数
      loading: false,
      key: null, //搜索关键字
      examrecord: [], //
      allExam: [], //所有考试信息
      flag: null, //标记属于哪个分类
      // startindex: null, //试卷筛选得出数组的开始下标
      // endtindex: null, //试卷筛选得出数组的结束下标
      currentPage: 1, //当前页
      total: null, //记录条数
      pageSize: 6, //每页条数
      pageSizes: [6, 10, 15, 20],
      // pagination: {
      //   //分页后的考试信息
      //   currentPage: 1, //当前页
      //   total: null, //记录条数
      //   pageSize: 6, //每页条数
      // },
    };
  },
  created() {
    // this.getExamInfo();

    this.$store.dispatch("getAllExam");
    // this.getTime();
    // this.getNumber();
    this.loading = true;
    // this.flag = 0;
    // this.endtindex = this.pageSize;
  },

  mounted() {
    this.getTime();
    this.getNumber();
    // this.loading = true;
    this.flag = 0;
    this.endtindex = this.pageSize;
  },
  computed: {
    // ...mapGetters(["getAllExam"]),
    getExams() {
      return this.$store.getters.examsList;
      // return this.$store.getters.getAllExam;
    },

  },
  watch: {
    getExams(val) {
      this.examsList = val;
      this.exams = val;
      console.log("aaval", val);
    },
  },
  methods: {
    //获取当前时间
    getTime() {
      this.loading = false;
      var date = new Date(); //创建时间对象
      var year = date.getFullYear(); //获取年
      var month = date.getMonth() + 1; //获取月
      var day = date.getDate(); //获取当日
      var hour = date.getHours();
      var minute = date.getMinutes();
      var seconds = date.getSeconds();
      var currentTime =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        seconds; //组合时间
      return currentTime;
    },
    //获取标签上的考试数
    getNumber() {
      console.log("56", this.$store.getters.examsList);

      var current_time = this.getTime();
      this.$axios("/api/exams").then((res) => {
        if (res.data.code == 200) {
          this.allExam = res.data.data;
          this.examrecord = this.allExam;
          this.total = this.allExam.length;
          this.num_all = this.total;
          this.num_nots = 0;
          this.num_s = 0;
          this.num_o = 0;
          this.allExam.forEach((item) => {
            this.flag = CompareDate(
              item.startTime.replace(/-/g, "/"),
              item.endTime.replace(/-/g, "/"),
              current_time.replace(/-/g, "/")
            );
            if (this.flag === 1) {
              this.num_nots++;
            }
            if (this.flag === 2) {
              this.num_s++;
            }
            if (this.flag === 3) {
              this.num_o++;
            }
          });
        }
      });
    },

    //获取当前所有考试信息
    getExamInfo() {
      this.examrecord = this.allExam;
      console.log("www", this.allExam);
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      console.log(`每页 ${val} 条`);
    },
    //改变当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },

    //点击未开始，筛选还没进行的考试
    showNotStarted() {
      var current_time = this.getTime();
      console.log('shabi',this.$store.getters.examsList)
   let allExam = this.$store.getters.examsList;

          let newPage = allExam.filter((item) => {
            // return item.source.includes(this.key);
            this.flag = CompareDate(
              item.startTime.replace(/-/g, "/"),
              item.endTime.replace(/-/g, "/"),
              current_time.replace(/-/g, "/")
            );
            if (this.flag === 1) {
              // console.log("source", item.source.includes(item.source));
              return item.source.includes(item.source);
            }
          });
          this.examrecord = newPage;

          this.total = this.examrecord.length;
          console.log("this.examrecord", newPage);
          // this.pagination.total = newPage.length;

          //   console.log("this.pagination", newPage.length);
    
    },

    //点击已开始，筛选已经进行的考试
    showStarted() {
      var current_time = this.getTime();
      console.log('shabi',this.$store.getters.examsList)
     
      
          let allExam = this.$store.getters.examsList;
          // this.num_s = 0;
          let newPage = allExam.filter((item) => {
            // return item.source.includes(this.key);
            this.flag = CompareDate(
              item.startTime.replace(/-/g, "/"),
              item.endTime.replace(/-/g, "/"),
              current_time.replace(/-/g, "/")
            );
            if (this.flag === 2) {
              // console.log("source", item.source.includes(item.source));
              return item.source.includes(item.source);
            }
          });
          this.examrecord = newPage;
          this.total = this.examrecord.length;
          console.log("this.examrecord", newPage);
    
        
    
    },
    //展示已过期的试卷
    showOverdue() {
      var current_time = this.getTime();
       console.log('shabi',this.$store.getters.examsList)
 
          let allExam = this.$store.getters.examsList;
          // this.num_o = 0;
          let newPage = allExam.filter((item) => {
            // return item.source.includes(this.key);
            this.flag = CompareDate(
              item.startTime.replace(/-/g, "/"),
              item.endTime.replace(/-/g, "/"),
              current_time.replace(/-/g, "/")
            );
            if (this.flag === 3) {
              return item.source.includes(item.source);
            }
          });
          this.examrecord = newPage;
          this.total = this.examrecord.length;
          console.log("this.examrecord", newPage);

    
    },
    //搜索试卷
    search() {
 let allExam = this.$store.getters.examsList;
          let newPage = allExam.filter((item) => {
            return item.source.includes(this.key);
          });
          this.examrecord = newPage;
          this.total = this.examrecord.length;
    
    },
    //跳转到试卷详情页
    toExamMsg(examCode) {
      this.$router.push({ path: "/examMsg", query: { examCode: examCode } });
      console.log(examCode);
    },
  },
};
</script>


<style scoped>
@import '../../assets/css/startExam.scss';
</style>
