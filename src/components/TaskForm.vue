<template>
    <form @submit.prevent="addTodo">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Add a new Todo" v-model="newTodo.title">
        </div>
        <div class="form-group">
            <button class="btn btn-success form-control" type="submit">Add Task</button>
        </div>
    </form>
</template>

<script>
    export default {
        name: "task-form",
        computed : {
          todos : function () {
              return this.$store.state.todos;
          }
        },
        data : function () {
            return {
                newTodo: {id: '', title: '', computed: false}
            }
        },
        methods: {
            addTodo: function () {
                var url = 'http://zhihu.carsonlius_liu.cn/api/tasks/';
                var params = {
                    name : this.newTodo.title
                };
                var vm = this;
                this.$http.post(url, params, {responseType : 'json'}).then(function(response){
                    if (response.body.status === 'success') {
                        vm.newTodo.id = response.body.task.id;
                        vm.todos.unshift(vm.newTodo);
                        vm.newTodo = {id: null, title: '', computed: false};
                    }
                }, function (response) {
                    console.log(response);

                });
            }
        }
    }
</script>

<style scoped>

</style>