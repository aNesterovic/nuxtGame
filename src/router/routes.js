export default [
  {
    path: '/',
    name: 'page-index',
    redirect: { name: 'sign-in' }
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/views/sign-in'),
  },
  {
    path: '/todo-list',
    name: 'todo-list',
    component: () => import('@/views/todo-list'),
  }
]
