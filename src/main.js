import Vue from 'vue'
import VueApollo from 'vue-apollo'
import VueRouter from 'vue-router'
import ApolloClient from 'apollo-boost'
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/tailwind.css'
import App from './App.vue'
import router from './router'

Vue.use(VueRouter)
Vue.use(VueApollo)

const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const apolloProvider = new VueApollo({
  defaultClient
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  apolloProvider,
  router
}).$mount('#app')
