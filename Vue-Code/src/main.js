import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router/index'
import BaiduMap from 'vue-baidu-map'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/icons' // icon
import '@/permission' // permission control

import { adminmenu } from '@/router/adminrouter';
import { clientmenu } from '@/router/clientrouter';
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use(BaiduMap, {
  ak: 'Pj9KBnqttMSllXzuAxikQ55l1S0ynz8e'
})

Vue.use(VueQuillEditor, /* { default global options } */)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {

    // eslint-disable-next-line eqeqeq
    if (this.$store.state.admin.author != '') {
      switch (this.$store.state.admin.author) {
        case 'admin':
          // this.$router.options.addRoutes(adminmenu);
          router.options.routes = adminmenu// 配置管理员路由
          router.addRoutes(adminmenu)// 动态加载路由
          break
        case 'client':
          router.options.routes = clientmenu// 配置管理员路由
          router.addRoutes(clientmenu)// 动态加载路由
          break
        default:
          //router.options.routes = web// 配置管理员路由
          //router.addRoutes(web)// 动态加载路由
          break
      }
    } else {
      router.push({ name: 'index' })
    }
  }
})
