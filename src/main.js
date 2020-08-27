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

// 使用vant
Vue.use(Vant)
// Vue.use(Button)
// 隐藏控制台vue提示语
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
