// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
import App from './App'
import router from './router'
import { headers } from '../../config/cors'

Vue.config.productionTip = false

const authLink = setContext((_, { header }) => {
  //get authentication from localstorage token
  const token = localStorage.getItem('blog-app-token')

  //returning headers to the context
  return{
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const httpLink = new HttpLink({
  //URL to graphql server
  uri: 'http://localhost:3333/graphql'
})

//Creating apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

//Installing vue plugin
Vue.usse(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
