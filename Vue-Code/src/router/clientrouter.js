
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const clientmenu = [
/*   {
    path: '/',
    component: Layout,
    redirect: {name:'Dashboard'},
    children: [{
      path: '/client/buy/list',
      name: 'Dashboard',
      component: () => import('@/views/client/buy/list'),
      meta: { title: '订单管理', icon: 'dashboard' ,params:{state:0}}
    }]
  }, */
  {
    path: '/client/buy',
    component: Layout,
    meta: { title: '订单管理', icon: 'table' },
    children: [
      {
        name: 'Dashboard',
        path: 'list0',
        component: () => import('@/views/client/buy/list'),
        meta: { title: '待发货订单', icon: 'table',params:{state:0} }
      },
      {
        path: 'list1',
        component: () => import('@/views/client/buy/list'),
        meta: { title: '待签收订单', icon: 'table',params:{state:1} }
      },
      {
        path: 'list2',
        component: () => import('@/views/client/buy/list'),
        meta: { title: '交易记录', icon: 'table',params:{state:2} }
      },
      {
        path: 'buylist',
        hidden:true,
        component: () => import('@/views/client/buy/buylist'),
        meta: { title: '交易明细', icon: 'table' }
      }
    ]
  },
  {
    path: '/client',
    component: Layout,
    meta: { title: '个人中心', icon: 'table' },
    children: [
      {
        path: 'win/edit',
        component: () => import('@/views/client/win/edit'),
        meta: { title: '修改资料', icon: 'table' }
      },
      {
        path: 'win/pwd',
        component: () => import('@/views/client/win/pwd'),
        meta: { title: '修改密码', icon: 'table' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // eslint-disable-next-line no-undef
  routes: clientmenu
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function logout() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
