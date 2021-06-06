<template>
  <div id="app" class="bg-blue-200">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
return{
   allExam: [], //所有考试信息
}
  },
 created() {


  },
 methods: {

}
}
</script>

<style>
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Microsoft YaHei", "Helvetica", "Tahoma", "Geneva", "Arial", sans-serif;

}
</style>
