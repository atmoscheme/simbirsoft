import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Note from '@/components/Notes/Note'
import NoteList from '@/components/Notes/NoteList'
import NewNote from '@/components/Notes/NewNote'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '',
    name: 'home',
    component: Home,
    beforeEnter: AuthGuard
  },
  {
    path: '/note/:id',
    props: true,
    name: 'note',
    component: Note,
    beforeEnter: AuthGuard
  },
  {
    path: '/list',
    name: 'list',
    component: NoteList,
    beforeEnter: AuthGuard
  }, {
    path: '/new',
    name: 'new',
    component: NewNote,
    beforeEnter: AuthGuard

  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/registration',
    name: 'reg',
    component: Registration
  }],
  mode: 'history'
})
