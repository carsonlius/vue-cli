<template>
    <form @submit.prevent="addTodo">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Add a new Todo" v-model="newTodo.title">
        </div>
        <div class="form-group">
            <button class="btn btn-success form-control" type="submit">Add Todo</button>
        </div>
    </form>
</template>

<script>
    export default {
        name: "task-form",
        props : ['todos'],
        data : function () {
            return {
                newTodo: {id: null, title: '', computed: false}
            }
        },
        methods: {
            addTodo: function () {
                this.todos.unshift(this.newTodo);
                this.newTodo = {id: null, title: '', computed: false};
            }
        }
    }
</script>

<style scoped>

</style>