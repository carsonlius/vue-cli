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
        computed: {
            todos: function () {
                return this.$store.state.todos;
            },
            newTodo: function () {
                return this.$store.state.newTodo;
            }
        },
        methods: {
            addTodo: function () {
                this.$store.dispatch('addTask', this.newTodo);
            }
        }
    }
</script>

<style scoped>

</style>