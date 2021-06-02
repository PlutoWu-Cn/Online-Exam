<template>
  <div>
    <span class="button">{{ name }}</span>
    <el-button @click="search" class="button">获取题目数据</el-button>
    <el-table
      :data="pagination"
      border
      :row-class-name="tableRowClassName"
      ref="TableId"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        prop="type"
        label="题目类型"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="question"
        label="题目信息"
        width="490"
      ></el-table-column>
      <el-table-column
        prop="answer"
        label="题目答案"
        width="490"
      ></el-table-column>
      <el-table-column
        prop="section"
        label="所属章节"
        width="100"
      ></el-table-column>

      <el-table-column
        prop="score"
        label="试题分数"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="level"
        label="难度等级"
        width="50"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allexamanswer: {},
      pagination: {},
      total: null,
      name: null
      // 试卷名称
    };
  },
  created() {
    this.name = this.$route.query.subject;
    this.$axios(`/api/answers/1/6`).then(res => {
      this.total = res.data.data.total;
      console.log(this.allexam);
    });
    this.search();
  },
  methods: {
    search() {
      let subject = this.$route.query.subject;
      const newData1 = [];
      console.log(this.total);
      this.$axios(`/api/answers/1/${this.total}`).then(res => {
        if (res.data.code == 200) {
          this.allexamanswer = res.data.data;
          console.log(this.allexamanswer);
          this.allexamanswer.records.map(function(item) {
            if (item.subject.search(subject) != -1) {
              newData1.push(item);
            }
          });
        }
      });
      console.log(newData1);
      this.pagination = newData1;
    }
  }
};
</script>
<style scoped>
.button {
  margin-left: 20px;
  margin-bottom: 10px;
}
</style>
