import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



export const web = [
    { path: '/',redirect:{name:'index'} },
    { path: '/login',name: 'adminlogin', component:  () => import('@/views/login/index') },
    { path: '/web/login/:author',name: 'userlogin', component:  () => import('@/views/web/login') },
    { path: '/web/reg',component:  () => import('@/views/web/reg') },
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    { path: '/index', name:'index', component: () => import('@/views/web/index'), hidden: true,meta:{show:true} },
    { path: '/introduce/:id', name:'about', component: () => import('@/views/web/introduce'), hidden: true },
    { path: '/thing2/:thingtype2Id', name:'thing2', component: () => import('@/views/web/thing'), hidden: true },
    { path: '/thing/:thingtypeId', name:'thing', component: () => import('@/views/web/thing'), hidden: true },
    { path: '/thing', name:'thing', component: () => import('@/views/web/thing'), hidden: true },
    { path: '/thing/show/:id', name:'thingshow', component: () => import('@/views/web/thingshow'), hidden: true },
    { path: '/buying', name:'buying', component: () => import('@/views/web/buying'), hidden: true },
    { path: '/news', name:'news', component: () => import('@/views/web/news'), hidden: true },
    { path: '/newsshow/:id', name:'newsshow', component: () => import('@/views/web/newsshow'), hidden: true }
  ]

  
  
export const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // eslint-disable-next-line no-undef
  routes: web
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function logout() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

