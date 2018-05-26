<template>
    <div>
        <ul class="list-group" v-if="todos.length">
            <paginate name="task_list" :list="todos" :per="per" @chnage="OnTaskChange" :hide-single-page="true">
                <li :class="{computed:todo.computed}" class="list-group-item"
                    v-for="(todo,index) in paginated('task_list')">
                    <router-link :to="{ name: 'task_show', params: { id: todo.id }}">{{ todo.title }}</router-link>
                    <button class="btn btn-xs pull-right" :class="[todo.computed ? 'btn-danger' : 'btn-primary']"
                            style="margin-left: 10px"
                            @click="toggleComputed(todo)">{{ todo.computed ? 'undo' : 'computed'}}
                    </button>
                    <button class="btn btn-warning btn-xs pull-right" style="margin-left: 10px"
                            @click="delTodo(todo,index)">Delete
                    </button>
                </li>
            </paginate>
            <paginate-links for="task_list" :sync="true" :limit="limit" :classes="classes"></paginate-links>


        </ul>
        <TaskForm :todos="todos"/>
    </div>
</template>

<script>
    import TaskForm from './TaskForm'

    export default {
        name: "task-list",
        components: {TaskForm},
        data: function () {
            return {
                paginate: ['task_list'],
                simple: {
                    prev: '上一页',
                    next: '下一页'
                },
                per: 2,
                limit: 5,
                step_links: {
                    next: 'N',
                    prev: 'P'
                },
                classes : {
                    'ul': 'list-inline',
                    // '.next > a': 'next-link',
                    // '.prev > a': ['prev-link', 'another-class'] // multiple classes
                }

            };
        },
        props: ['todos'],
        methods: {
            OnTaskChange: function (toPage, fromPage) {
                console.log('发生了变化');
                console.log(toPage);
                console.log(fromPage);
            },
            delTodo: function (todo, index) {

                var url = 'http://zhihu.carsonlius_liu.cn/api/tasks/' + todo.id;
                var vm = this;
                this.$http.delete(url).then(function (response) {
                    console.log(response.body);
                    if (response.body.status === 'success') {
                        vm.todos.splice(index, 1);
                    }
                });

            },
            toggleComputed: function (todo) {
                var url = 'http://zhihu.carsonlius_liu.cn/api/tasks/' + todo.id;
                var params = {
                    computed: todo.computed ? 0 : 1
                };
                console.log(todo);
                console.log(params);
                this.$http.patch(url, params).then(function (response) {
                    console.log(response);
                    if (response.body.success === true) {
                        todo.computed = !todo.computed;
                    }

                }, function (response) {
                    console.log(response);
                });
            }
        },
    }
</script>

<style scoped>
    .computed {
        color: green;
        text-decoration: line-through;
    }



</style>