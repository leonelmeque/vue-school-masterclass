import {
  createRouter,
  createWebHistory,
  type RouterOptions
} from 'vue-router'
import PageHomeVue from '@/pages/Home.vue'
import PageThreadShow from '@/pages/ThreadShow.vue'
import NotFoundVue from '@/pages/NotFound.vue'
import ForumPage from '@/pages/ForumPage.vue'
import CategoryPage from '@/pages/CategoryPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import ThreadCreate from '@/pages/ThreadCreate.vue'
import ThreadEdit from '@/pages/ThreadEdit.vue'
import { findById } from '@/helpers'
import { useStore } from 'vuex'

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
    path: '/me',
    name: 'Profile',
    component: ProfilePage,
    props: { edit: false },
    meta: { toTop: true, smoothScroll: true }
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: ProfilePage,
    props: { edit: true }
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: PageThreadShow,
    props: true,
    beforeEnter(to, _from, next) {
      const store = useStore()

      const threadExists = findById(
        store.state.threads,
        (to as any)?.params?.id
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
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true
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
  routes,
  scrollBehavior(to) {
    const scroll: { [key: string]: any } = {}

    if (to.meta.toTop) scroll.to = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'

    return scroll
  }
})

export default router
