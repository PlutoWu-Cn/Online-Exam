  //  对所有试卷的日期与当前日期相比较
    //  d1:startTime考试开始时间
    //  d2:endTime考试结束时间
    //  d3:currentTime当前时间
   var CompareDate=function(d1, d2, d3) {
        //当前时间d3<考试开始时间d1 :未开始
        if (new Date(d3) <= new Date(d1)) {
          return 1;
        }
        //开始时间d1<当前时间d3<考试结束时间d2  :已开始
        if (new Date(d1) < new Date(d3) && new Date(d3) <= new Date(d2)) {
          return 2;
        }
        //已过期
        else {
          return 3;
        }
      }

      export default{
        CompareDate
      }
  