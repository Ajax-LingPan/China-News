import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import Vuecropper from '../views/Vuecropper.vue'
// 使用路由
Vue.use(VueRouter)
// 解决路由重复跳转的异常报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 配置路由规则

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user_edit', component: UserEdit, name: 'user_edit' },
  { path: '/vue_cropper', component: Vuecropper, name: 'vue_cropper' }
]
const router = new VueRouter({
  routes
})
// 设置全局路由导航守卫
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  const routePath = ['/user', '/user_edit', '/vue_cropper']
  // 如果跳转的不是去user或者是user_edit 并且有token =>放行
  if (!routePath.includes(to.path) || token) {
    next()
  } else {
    // 如果跳转的是user 但是没有token 返回到登录页
    router.push('/login')
    next()
  }
})

// 路由规则
export default router
