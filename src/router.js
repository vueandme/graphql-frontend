import VueRouter from 'vue-router'
import Home from './views/Home'
import Wine from './views/Wine'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/wine/:id',
    name: 'wine',
    component: Wine
  }
]

export default new VueRouter({
  routes,
  mode: 'history'
})
