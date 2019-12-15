import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCompositionApi from '@vue/composition-api'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { provide } from '@vue/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/tailwind.css'
import App from './App.vue'
import router from './router'
import typeDefs from './graphql/localSchema.gql'
import { resolvers } from './graphql/resolvers'

Vue.use(VueRouter)
Vue.use(VueCompositionApi)

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const cache = new InMemoryCache()

const defaultClient = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers
})

cache.writeData({
  data: {
    favoriteWines: ['9X9d6n2r7']
  }
})

Vue.config.productionTip = false

new Vue({
  setup() {
    provide(DefaultApolloClient, defaultClient)
  },
  render: h => h(App),
  router
}).$mount('#app')
