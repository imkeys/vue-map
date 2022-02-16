export default [
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "page" */ '@/views/home/')
  }
]
