export default [
  {
    path: '/bd-map',
    component: () => import(/* webpackChunkName: "page" */ '@/views/bd-map/')
  },
  {
    path: '/tx-map',
    component: () => import(/* webpackChunkName: "page" */ '@/views/tx-map/')
  },
  {
    path: '/tx-map-webgl',
    component: () => import(/* webpackChunkName: "page" */ '@/views/tx-map-webgl/')
  }
]
