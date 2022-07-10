
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const adminmenu = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: {name:'Dashboard'},
    children: [{
      path: '/admin/client',
      name: 'Dashboard',
      component: () => import('@/views/admin/client/list'),
      meta: { title: '会员管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/admin/thing',
    component: Layout,
    meta: { title: '商品管理', icon: 'table' },
    children: [
      {
        path: 'add',
        component: () => import('@/views/admin/thing/add'),
        meta: { title: '发布商品', icon: 'table' }
      },
      {
        path: 'thing_list',
        name: 'Dashboard',
        component: () => import('@/views/admin/thing/list'),
        meta: { title: '商品管理', icon: 'table' }
      }
    ]
  },{
    path: '/admin/buy',
    component: Layout,
    meta: { title: '订单管理', icon: 'table' },
    children: [
      {
        path:"list0",
        component: () => import('@/views/admin/buy/list'),
        meta: { title: '待发货订单', icon: 'table',params:{state:0} }
      },
      {
        path:"list1",
        component: () => import('@/views/admin/buy/list'),
        meta: { title: '待签收订单', icon: 'table',params:{state:1} }
      },
      {
        path:"list2",
        component: () => import('@/views/admin/buy/list'),
        meta: { title: '交易记录', icon: 'table',params:{state:2} }
      },
      {
        path: 'buylist',
        hidden:true,
        component: () => import('@/views/admin/buy/buylist'),
        meta: { title: '交易明细', icon: 'table' }
      }
    ]
  }, 
  {
    path: '/admin/news',
    component: Layout,
    meta: { title: '资讯管理', icon: 'table' },
    children: [
      {
        path: 'add',
        component: () => import('@/views/admin/news/add'),
        meta: { title: '发布资讯', icon: 'table' }
      },
      {
        path: 'list',
        name: 'admin_news_list',
        component: () => import('@/views/admin/news/list'),
        meta: { title: '资讯管理', icon: 'table' }
      }
    ]
  }, {
    path: '/admin/newstype',
    component: Layout,
    meta: { title: '资讯分类管理', icon: 'table' },
    children: [
      {
        path: 'add',
        component: () => import('@/views/admin/newstype/add'),
        meta: { title: '添加分类', icon: 'table' }
      },
      {
        path: 'list',
        name: 'admin_newstype_list',
        component: () => import('@/views/admin/newstype/list'),
        meta: { title: '分类管理', icon: 'table' }
      }
    ]
  },  {
    path: '/admin/thingtype',
    component: Layout,
    meta: { title: '商品分类管理', icon: 'table' },
    children: [
      {
        path: 'add',
        component: () => import('@/views/admin/thingtype/add'),
        meta: { title: '添加分类', icon: 'table' }
      },
      {
        path: 'list',
        name: 'admin_thingtype_list',
        component: () => import('@/views/admin/thingtype/list'),
        meta: { title: '分类管理', icon: 'table' }
      }
    ]
  },{
    path: '/admin/thingtype2',
    component: Layout,
    meta: { title: '商品区域管理', icon: 'table' },
    children: [
      {
        path: 'add',
        component: () => import('@/views/admin/thingtype2/add'),
        meta: { title: '添加区域', icon: 'table' }
      },
      {
        path: 'list',
        name: 'admin_thingtype2_list',
        component: () => import('@/views/admin/thingtype2/list'),
        meta: { title: '区域管理', icon: 'table' }
      }
    ]
  },{
    path: '/admin',
    component: Layout,
    meta: { title: '系统中心', icon: 'table' },
    children: [
        {
            path: 'anout',
            component: () => import('@/views/admin/introduce/edit'),
            meta: { title: '关于我们', icon: 'table' ,params:{id: 1}}
          }, 
          {
            path: 'call',
            component: () => import('@/views/admin/introduce/edit'),
            meta: { title: '联系我们', icon: 'table' ,params:{id: 2}}
          }, 
          {
        path: 'win/pwd',
        component: () => import('@/views/admin/win/pwd'),
        meta: { title: '修改密码', icon: 'table' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: adminmenu
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function logout() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
