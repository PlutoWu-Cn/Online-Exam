import VUE from "vue";
import VUEX from "vuex";
import axios from "axios";

VUE.use(VUEX);

const state = {
  isPractice: false, //练习模式标志
  flag: false, //菜单栏左右滑动标志
  userInfo: null,
  list: [1, 3, 5, 7, 9, 20, 30],
exams:[],
 
  menu: [
    {
      index: "1",
      title: "考试管理",
      icon: "icon-kechengbiao",
      content: [
        { item1: "功能介绍", path: "/examDescription" },
        { item2: "考试查询", path: "selectExam" },
        { item3: "添加考试", path: "/addExam" }
      ]
    },
    {
      index: "2",
      title: "题库管理",
      icon: "icon-tiku",
      content: [
        { item1: "功能介绍", path: "/answerDescription" },
        { item2: "所有题库", path: "/selectAnswer" },
        { item3: "增加题库", path: "/addAnswer" },
        { path: "/addAnswerChildren" }
      ]
    },
    {
      index: "3",
      title: "成绩查询",
      icon: "icon-performance",
      content: [
        { item1: "学生成绩查询", path: "/allStudentsGrade" },
        { path: "/grade" },
        { item2: "成绩分段查询", path: "/selectExamToPart" },
        { path: "/scorePart" }
      ]
    },
    {
      index: "4",
      title: "学生管理",
      icon: "icon-role",
      content: [
        { item1: "学生管理", path: "/studentManage" },
        { item2: "添加学生", path: "/addStudent" }
      ]
    }
    // {
    //   index: '5',
    //   title: '教师管理',
    //   icon: 'icon-Userselect',
    //   content:[{item1:'教师管理',path:'/teacherManage'},{item2: '添加教师',path: '/addTeacher'}],
    // },
    // {
    //   index: '7',
    //   title: '模块管理',
    //   icon: 'icon-module4mokuai',
    //   content:[{item1:'模块操作',path:'/module'}],
    // }
  ]
};
const mutations = {
  practice(state, status) {
    state.isPractice = status;
  },
  toggle(state) {
    state.flag = !state.flag;
  },
  changeUserInfo(state, info) {
    state.userInfo = info;
  },
  allExam(state){
    state.exams=this.exams
    // console.log('state.exams',state.exams)
  }
};
const getters = {
  filteredList: state => {
    return state.list.filter(item => item > 10);
  },
  examsList:state=>{
    console.log('s1',state.exams);
    return state.exams;
  },
  // getAllExam: state => state.getAllExam
};
const actions = {
  getUserInfo(context, info) {
    context.commit("changeUserInfo", info);
  },
  getPractice(context, status) {
    context.commit("practice", status);
  },
  getAllExam(context,exams) {
    axios("/api/exams").then(res => {
      if (res.data.code == 200) {
        this.exams = res.data.data;
        console.log("action中调用封装后的axios成功");
 
       context.commit("allExam",this.exams)
      //  console.log("this.exams", this.exams);
       
      }
    });
  }
};
export default new VUEX.Store({
  state,
  mutations,
  getters,
  actions
  // store
});
