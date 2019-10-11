import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Demo from '../components/Demo'
import NamesRules from '../pages/NamesRules'
import NumberGame from '../pages/NumberGame'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/NamesRules',
      name: 'NamesRules',
      component: NamesRules
    },
    {
      path: '/NumberGame',
      name: 'NumberGame',
      component: NumberGame
    }
  ]
})
