import * as Vue from 'vue'
import * as VueRouter from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: Vue.defineAsyncComponent(() => import('@/views/login/index.vue')),
    hidden: true,
  },

  {
    path: '/404',
    component: Vue.defineAsyncComponent(() => import('@/views/404.vue')),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Vue.defineAsyncComponent(
          () => import('@/views/dashboard/index.vue')
        ),
        meta: { title: 'Dashboard', icon: 'dashboard' },
      },
    ],
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: Vue.defineAsyncComponent(
          () => import('@/views/table/index.vue')
        ),
        meta: { title: 'Table', icon: 'table' },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: Vue.defineAsyncComponent(() => import('@/views/tree/index.vue')),
        meta: { title: 'Tree', icon: 'tree' },
      },
    ],
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: Vue.defineAsyncComponent(() => import('@/views/form/index.vue')),
        meta: { title: 'Form', icon: 'form' },
      },
    ],
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested',
    },
    children: [
      {
        path: 'menu1',
        component: Vue.defineAsyncComponent(
          () => import('@/views/nested/menu1/index.vue')
        ), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: Vue.defineAsyncComponent(
              () => import('@/views/nested/menu1/menu1-1/index.vue')
            ),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' },
          },
          {
            path: 'menu1-2',
            component: Vue.defineAsyncComponent(
              () => import('@/views/nested/menu1/menu1-2/index.vue')
            ),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: Vue.defineAsyncComponent(
                  () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue')
                ),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' },
              },
              {
                path: 'menu1-2-2',
                component: Vue.defineAsyncComponent(
                  () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue')
                ),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: Vue.defineAsyncComponent(
              () => import('@/views/nested/menu1/menu1-3/index.vue')
            ),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' },
          },
        ],
      },
      {
        path: 'menu2',
        component: Vue.defineAsyncComponent(
          () => import('@/views/nested/menu2/index.vue')
        ),
        name: 'Menu2',
        meta: { title: 'menu2' },
      },
    ],
  },

  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: constantRoutes, // mode: 'history', // require service support
    scrollBehavior: () => ({
      top: 0,
    }),
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
