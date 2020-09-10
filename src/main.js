import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/base.less'
import './style/iconfont.css'
// 导入vant文件
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'

// import Vue from 'vue'
// import {Button} from 'vant'
// 引入rem适配插件
import 'amfe-flexible'
import axios from 'axios'
import moment from 'moment'

// 全局组件注册
import Hmheader from './components/Hmheader.vue'
import Hmlogo from './components/Hmlogo.vue'
import Hmnavbs from './components/Hmnavbs.vue'
import post from './components/Hmpost.vue'
import Comment from './components/Comment.vue'
import Floor from './components/Floor.vue'

Vue.component('hm_header', Hmheader)
Vue.component('hm_logo', Hmlogo)
Vue.component('hm_navbs', Hmnavbs)
Vue.component('post', post)
Vue.component('comment', Comment)
// 2 全局注册递归组件 floor
Vue.component('floor', Floor)
Vue.use(Vant)
// 设置全局路由导航守卫
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   const routePath = ['/login', '/user_edit']
//   if (!routePath.includes(to.path) || token) {
//     next()
//   } else {
//     router.push('/login')
//   }
// })
const URL = 'http://localhost:3000'
// 将axios挂载到vue原型上
Vue.prototype.$axios = axios
// 给axios配置默认的基准地址
axios.defaults.baseURL = URL
Vue.prototype.$base = URL
Vue.prototype.$url = (url) => {
  if (url.startsWith('http')) {
    return url
  } else {
    return URL + url
  }
}
// 设置axios请求拦截器
axios.interceptors.request.use(config => {
  // config指的是请求的配置信息
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 设置axios 响应拦截器
axios.interceptors.response.use(response => {
  const { statusCode, message } = response.data
  if (statusCode === 401 || message === '用户信息验证失败') {
    Toast(message)
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
  return response
})
// 定义全局过滤器
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
// 定义时间过去式
Vue.filter('now', input => {
  return moment(input).fromNow()
})
// 格式化中文时间
moment.locale('zh-CN')
// Vue.use(Button)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
