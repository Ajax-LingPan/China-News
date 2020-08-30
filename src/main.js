import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/base.less'
import './style/iconfont.css'
// 导入vant文件
import Vant from 'vant'
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
// 定义全局过滤器
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
Vue.component('hm_header', Hmheader)
Vue.component('hm_logo', Hmlogo)
Vue.component('hm_navbs', Hmnavbs)
Vue.use(Vant)
// Vue.use(Button)
// 设置全局路由导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'user' || token) {
    next()
  } else {
    router.push('/login')
  }
})

// 将axios挂载到vue原型上
Vue.prototype.$axios = axios
// 给axios配置默认的基准地址
axios.defaults.baseURL = 'http://localhost:3000'
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
