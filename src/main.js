// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import VueRouter from 'vue-router'
import VuePaginate from 'vue-paginate'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationDropdown from 'vuetable-2/src/components/VuetablePaginationDropdown'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

// 引入分页
Vue.use(VueResource)
Vue.use(VuePaginate)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component('vuetable', Vuetable)
Vue.component('vuetable-pagination', VuetablePagination)
Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown)
Vue.component('vuetable-pagination-info', VuetablePaginationInfo)

import TaskList from './components/TaskList'
import TaskDetail from './components/TaskDetail'
import PaginationTask from './components/PaginationTask'

// 路由规则
const routes = [
    {path: '/', component: TaskList},
    {path: '/task/:id', component: TaskDetail, name: 'task_show'},
    {path: '/task_page_list', component: PaginationTask, name: 'task_page'}
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    mode: 'history',
    routes // （缩写）相当于 routes: routes
})


const Http = new Vue
const store = new Vuex.Store({
    state: {
        count: 0,
        todos: [],
        newTodo: {id: '', title: '', computed: false}
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setTask: function (state, task_list) {
            state.todos = task_list;
        },
        delSpecialTask: function (state, index) {
            state.todos.splice(index, 1);
        },
        toggleComputed: function (state, todo) {
            todo.computed = !todo.computed;
        },
        addTask: function (state, newTodo) {
            state.todos.unshift(newTodo);
            console.log(state.newTodo);
        },
        resetTask : function (state) {
            state.newTodo = {id: '', title: '', computed: false}
        }
    },
    actions: {
        setTaskList: function (store) {
            let url = 'http://zhihu.carsonlius_liu.cn/api/tasks';
            Http.$http.get(url).then(function (response) {
                if (response.status === 200) {
                    store.commit('setTask', response.body);
                }
            });
        },
        delTask: function (store, {index, task}) {
            let url = 'http://zhihu.carsonlius_liu.cn/api/tasks/' + task.id;
            Http.$http.delete(url).then(function (response) {
                if (response.body.status === 'success') {
                    store.commit('delSpecialTask', index);
                }
            });
        },
        toggleComputed: function (store, todo) {
            let url = 'http://zhihu.carsonlius_liu.cn/api/tasks/' + todo.id;
            let params = {
                computed: todo.computed ? 0 : 1
            };
            Http.$http.patch(url, params).then(function (response) {
                if (response.body.success === true) {
                    store.commit('toggleComputed', todo);
                }
            }, function (response) {
                console.log(response);
            });
        },
        addTask: function (store, newTodo) {
            let url = 'http://zhihu.carsonlius_liu.cn/api/tasks/';
            let params = {name: newTodo.title};
            Http.$http.post(url, params, {responseType: 'json'}).then(function (response) {
                if (response.body.status === 'success') {
                    newTodo.id = response.body.task.id;
                    store.commit('addTask', newTodo);
                    store.commit('resetTask');
                }
            }, function (response) {
                console.log(response);

            });
        },
        resetTask: function (store) {
            store.commit('resetTask');
        }
    }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>',
})
