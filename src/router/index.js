import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/pages/main-page'
import LoginPage from '@/pages/login-page/login'
import RegisterPage from '@/pages/register-page'

import ShultGrid from '@/pages/sub-pages/shult-grid'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      redirect: '/shult-grid',
      children: [
        {
          path: 'shult-grid',
          name: 'ShultGrid',
          component: ShultGrid
        }
      ]
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    }
  ]
})
