<template>
    <div class="task">
        <div class="loading" v-if="loading">
            加载中...
        </div>

        <div v-if="error" class="error">
            {{ error }}
        </div>

        <div v-if="task" class="content">
            <h2>{{ task.title }}</h2>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                loading: false,
                task: null,
                error: null
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                this.error = this.task = null
                this.loading = true
                // replace gettask with your data fetching util / API wrapper
                var url = 'http://zhihu.carsonlius_liu.cn/api/tasks/';
                var id = this.$route.params.id;
                this.$http.get(url+id).then(function (response) {
                    this.loading = false;
                    if (response.status === 200){
                        this.task = response.body;
                    }

                });
            }
        }
    }
</script>

<style scoped>

</style>