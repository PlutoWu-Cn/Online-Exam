<!-- 添加考试 -->
<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="80px" :rules="addexamules">
      <el-form-item label="试卷名称" prop="source">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="所属学院" prop="institute">
        <el-input v-model="form.institute"></el-input>
      </el-form-item>
      <el-form-item label="所属专业" prop="major">
        <el-input v-model="form.major"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-input v-model="form.grade"></el-input>
      </el-form-item>
      <el-form-item label="考试日期" prop="cc">
        <el-col :span="11">
          <el-date-picker
            placeholder="选择日期"
            v-model="form.examDate"
            style="width: 100%;"
            type="datetime"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="持续时间" prop="totalTime">
        <el-input v-model="form.totalTime"></el-input>
      </el-form-item>
      <el-form-item label="总分" prop="totalScore">
        <el-input v-model="form.totalScore"></el-input>
      </el-form-item>
      <el-form-item label="考试类型" prop="type">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="考生提示" prop="tips">
        <el-input type="textarea" v-model="form.tips"></el-input>
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
    return {
      form: {
        //表单数据初始化
        source: null,
        description: null,
        institute: null,
        major: null,
        grade: null,
        examDate: null,
        totalTime: null,
        totalScore: null,
        type: null,
        tips: null,
        paperId: null,
        startTime: null,
        endTime: null
      },
      addexamules: {
        source: {
          required: true,
          message: "请输入试卷名称",
          trigger: "blur"
        },

        institute: {
          required: true,
          message: "请输入学院名称",
          trigger: "blur"
        },
        major: { required: true, message: "请输入专业", trigger: "blur" },
        grade: { required: true, message: "请输入年级", trigger: "blur" },

        totalTime: {
          required: true,
          message: "请输入持续时间",
          trigger: "blur"
        },
        totalScore: {
          required: true,
          message: "请输入总分",
          trigger: "blur"
        },
        examDate: {
          required: true,
          message: "请选择日期",
          trigger: "blur"
        },
        type: { required: true, message: "请输入考试类型", trigger: "blur" }
      }
    };
  },
  methods: {
    formatTime(date) {
      //日期格式化

      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      this.form.startTime =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      console.log(this.form.startTime);
      //endtime的设置
      let time1 = Number(parseInt(this.form.totalTime / 60)) + Number(hours);
      let time2 = Number(this.form.totalTime % 60) + Number(minutes);
      if (Number(time2) >= 60) {
        time2 = Number(time2) - 60;
        time1 = Number(time1) + 1;
      }
      this.form.endTime =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        time1 +
        ":" +
        time2 +
        ":" +
        seconds;
      console.log(this.form.endTime);
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    onSubmit() {
      console.log(this.form.examDate);

      this.$refs.form.validate(async valid => {
        if (!valid) return this.$message.error("请按照提示填入数据");
        if (this.form.examDate === null) {
          return this.$message.error("请选择考试日期");
        }

        let examDate = this.formatTime(this.form.examDate);
        // this.form.examDate = examDate;
        this.form.examDate = examDate.substr(0, 10);
        console.log(this.form.examDate);
        this.$axios(`/api/examManagePaperId`).then(res => {
          this.form.paperId = res.data.data.paperId + 1; //实现paperId自增1
          this.$axios({
            url: "/api/exam",
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
              this.$router.push({ path: "/selectExam" });
            }
          });
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
