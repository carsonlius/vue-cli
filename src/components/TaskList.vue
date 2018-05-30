<template>
    <div>
        <ul class="list-group" v-if="todos">
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
            <paginate-links for="task_list" :sync="true" :limit="limit" :show-step-links="true" :classes="classes"></paginate-links>
        </ul>
        <div class="left_align">
            <TaskForm/>
        </div>
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
                per: 10,
                limit: 3,
                step_links: {
                    next: 'N',
                    prev: 'P'
                },
                classes : {
                    'ul': ['pagination'],
                }

            };
        },
        // props: ['todos'],
        computed : {
           todos : function () {
               return this.$store.state.todos;
           }
        },
        methods: {
            OnTaskChange: function (toPage, fromPage) {
            },
            delTodo: function (task, index) {
                this.$store.dispatch('delTask', {task, index});

            },
            toggleComputed: function (todo) {
                this.$store.dispatch('toggleComputed', todo);
            }
        },
    }
</script>

<style scoped>
    .left_align {
        margin-left: 30px;
    }
    .computed {
        color: red;
        text-decoration: line-through;
    }
</style>