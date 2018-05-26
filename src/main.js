// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)

// 引入bootstrap  && jQuery
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VuePaginate from 'vue-paginate'

// 引入分页
Vue.use(VuePaginate)

// 引入vue-resource
Vue.use(VueResource)

// 引入vue router
Vue.use(VueRouter)


import TaskList from './components/TaskList'
import TaskDetail from './components/TaskDetail'

// 路由规则
const routes = [
    { path: '/', component: TaskList},
    { path: '/task/:id', component: TaskDetail, name:'task_show' }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
    router,
    components: { App },
  template: '<App/>',
})
