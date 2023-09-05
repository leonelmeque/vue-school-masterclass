import {
  createRouter,
  createWebHistory,
  type RouterOptions
} from 'vue-router'
import PageHomeVue from '@/pages/Home.vue'
import PageThreadShow from '@/pages/ThreadShow.vue'
import NotFoundVue from '@/pages/NotFound.vue'
import ForumPage from '@/pages/ForumPage.vue'
import sourceData from '../../data.json'
import CategoryPage from '@/pages/CategoryPage.vue'

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'Home',
    component: PageHomeVue
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: CategoryPage,
    props: true
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: PageThreadShow,
    props: true,
    beforeEnter(to, _from, next) {
      const threadExists = sourceData.threads.find(
        (t) => t.id === to.params.id
      )
      if (threadExists) return next()
      else
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash
        })
    }
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: ForumPage,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => NotFoundVue
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
