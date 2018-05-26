<template>
  <div id="app">
    <img src="./assets/logo.png">
      <router-view :todos="todos"></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
    data: function() {
      return {
          message: 'Hello World',
          todos: [
          ]
      }
    },

    // vue 准备好的时候
    mounted : function () {
      var url = 'http://zhihu.carsonlius_liu.cn/api/tasks';
      this.$http.get(url).then(function (response) {
          if (response.status === 200) {
              this.todos = response.body;
              console.log(this.todos);
          }
      });
    },
    computed: {
        todoCount: function () {
            return this.todos.length;
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
