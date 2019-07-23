import * as fb from 'firebase'
import AuthGuard from '../router/auth-guard'
/* import store from './index' */

class User {
  constructor (id) {
    this.id = id
  }
}
export default {
  state: {
    user: null,
    usersInfo: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    loadUsersInfo (state, payload) {
      state.usersInfo = payload
    }
  },
  actions: {
    async registerUser ({commit}, {
      email,
      password,
      image,
      personal
    }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        personal.group = 'user'
        await fb.database().ref('users').child(user.user.uid).set(personal)
        console.log(image)
        if (image) {
          fb.storage().ref().child(`users/${user.user.uid}`).put(image).then(function (snapshot) {
            snapshot.ref.getDownloadURL().then(function (url) {
              const imageSrc = url
              fb.database().ref('users').child(user.user.uid).update({imageSrc})
            })
          })
        }
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({
      commit}, {
      email,
      password
    }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        location.reload()
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
      /* AuthGuard */
    },
    logoutUser ({
      commit}) {
      fb.auth().signOut()
      commit('setUser', null)
    },
    async fetchUserInfo ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      // eslint-disable-next-line no-unused-vars
      const resultUserInfo = []
      try {
        const fbVal = await fb.database().ref('users').once('value')
        const usersInfo = fbVal.val()

        commit('loadUsersInfo', usersInfo)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    },
    usersInfo (state) {
      return state.usersInfo
    }
  }

}
