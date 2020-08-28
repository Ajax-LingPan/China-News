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

// 全局组件注册
import Hmheader from './components/Hmheader.vue'
import Hmlogo from './components/Hmlogo.vue'
Vue.component('hm_header', Hmheader)
Vue.component('hm_logo', Hmlogo)
Vue.use(Vant)
// Vue.use(Button)
// 将axios挂载到vue原型上
Vue.prototype.$axios = axios
// 给axios配置默认的基准地址
axios.defaults.baseURL = 'http://localhost:3000'
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
