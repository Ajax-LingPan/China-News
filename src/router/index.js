import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入用户界面组件
import Login from '../views/users/Login.vue'
import Register from '../views/users/Register.vue'
import User from '../views/users/User.vue'
import UserEdit from '../views/users/UserEdit.vue'
import Vuecropper from '../views/users/Vuecropper.vue'
import Attention from '../views/users/Attention.vue'
import Lick from '../views/users/Lick.vue'
import Collect from '../views/users/Collect.vue'
// 导入首页组件
import Index from '../views/news/Index.vue'
import Manage from '../views/news/Manage.vue'
import Details from '../views/news/Details.vue'
import Tosearch from '../views/news/Tosearch.vue'
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
  { path: '/vue_cropper', component: Vuecropper, name: 'vue_cropper' },
  { path: '/attention', component: Attention, name: 'attention' },
  { path: '/lick', component: Lick, name: 'lick' },
  { path: '/collect', component: Collect, name: 'collect' },
  // 首页组件规则
  { path: '/', component: Index, name: 'index' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/details/:id', component: Details, name: 'details' },
  { path: '/tosearch', component: Tosearch, name: 'tosearch' }
]
const router = new VueRouter({
  routes
})
// 设置全局路由导航守卫
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  const routePath = ['/user', '/user_edit', '/vue_cropper', 'lick', 'attention', 'collect']
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
