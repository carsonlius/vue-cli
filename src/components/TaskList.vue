<template>
    <ul class="list-group" v-if="todos.length">
        <li :class="{computed:todo.computed}" class="list-group-item" v-for="(todo,index) in todos">{{ todo.title }}
            <button class="btn btn-xs pull-right" :class="[todo.computed ? 'btn-danger' : 'btn-primary']"
                    style="margin-left: 10px"
                    @click="toggleComputed(todo)">{{ todo.computed ? 'undo' : 'computed'}}
            </button>
            <button class="btn btn-warning btn-xs pull-right" style="margin-left: 10px"
                    @click="delTodo(index)">Delete
            </button>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "task-list",
        data: function () {
            return {
            };
        },
        props: ['todos'],
        methods: {
            delTodo: function (index) {
                this.todos.splice(index, 1);
            },
            toggleComputed: function (todo) {
                console.log(todo);
                todo.computed = !todo.computed;
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