import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { beforeEach } from './middleware'

export const defaultRedirect = () => {
  return 'todo-list'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(beforeEach)

export default router
