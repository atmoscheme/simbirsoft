import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import Vue2Filters from 'vue2-filters'
import VueFilter from 'vue-filter'
import VueColor from 'vue-color'
Vue.use(Vue2Filters)
Vue.config.productionTip = false
Vue.prototype.$http = require('axios')
Vue.use(Vuetify, {
  theme: {
    primary: '#009f90', // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})
Vue.use(VueFilter)
Vue.use(VueColor)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  created: function () {
    fb.initializeApp({
      apiKey: 'AIzaSyBnmYYGLDGc1c5EiX415_mYEx5fKArNGj0',
      authDomain: 'notepad-8d8c1.firebaseapp.com',
      databaseURL: 'https://notepad-8d8c1.firebaseio.com',
      projectId: 'notepad-8d8c1',
      storageBucket: '',
      messagingSenderId: '929001476482',
      appId: '1:929001476482:web:44489d81e39e9358'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    }
    )
    this.$store.dispatch('fetchNotes')
  }
})
