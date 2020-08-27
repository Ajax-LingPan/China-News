import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
// 使用路由
Vue.use(VueRouter)
// 配置路由规则
const routes = [{
  path: '/login',
  component: Login
}, {
  path: '/register',
  component: Register
}]
// 路由规则
const router = new VueRouter({
  routes
})

export default router
