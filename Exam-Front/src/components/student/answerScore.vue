<template>
  <div class="score">
    <div class="title">
      <p class="name">科目：计算机网络</p>
      <p class="description">(总分：100分,限时：100分钟)</p>
      <p class="description">学生：大咸鱼</p>
    </div>
    <div class="total ">
      <div class="look">
        本次考试成绩
      </div>
      <div class="show">
        <div class="img1" :class="{'img1Transform': imgShow}">
          <img :src="imgSrc.fail1" alt="哭了" v-if="score < 60">
          <img :src="imgSrc.pass1" alt="过了" v-if="score >= 60">
        </div>
        <div class="number" :class="{'border': isTransition}">
          <span>{{score}}</span>
          <span>分数</span>
        </div>
        <div class="img2" :class="{'img2Transform': imgShow}">
          <img :src="imgSrc.fail2" alt="哭了" v-if="score < 60">
          <img :src="imgSrc.pass2" alt="过了" v-if="score >= 60">
        </div>
      </div>
      <ul class="time">
        <li class="start"><span>开始时间</span> <span>{{startTime}}</span></li>
        <li class="end"><span>结束时间</span> <span>{{endTime}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTransition: false, //是否渲染完成
      score: 0, //总分
      imgShow: false, //不及格图片显示
      imgSrc: {
        fail1: require("@/assets/img/cry1.gif"),
        fail2: require('@/assets/img/cry2.jpg'),
        pass1: require('@/assets/img/good1.jpg'),
        pass2: require('@/assets/img/good2.gif')
      },
      startTime: null, //考试开始时间
      endTime: null, //考试结束时间
    }
  },
  created() {
    this.transiton()
    this.getScore()
  },
  methods: {
    transiton() {  //一秒后过渡
      setTimeout(() => {
        this.isTransition = true
        this.imgShow = true
      },1000)
    },
    getScore() {
      let score = this.$route.query.score
      let startTime = this.$route.query.startTime
      let endTime = this.$route.query.endTime
      this.score = score
      this.startTime = startTime
      this.endTime = endTime
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/answerScore.scss';
</style>
