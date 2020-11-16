import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from "../views/Login.vue"
import Welcome from "@/views/Welcome";
import Add from "@/views/Add/Add";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },{
    path:"/index",
    name:'Index',
    component: Index,
    children:[{
      path:'/index',
      redirect:'/index/welcome'
    },
    {
      path:'/index/welcome',
      name:"Welcome",
      component:Welcome,
    },
    {
      path:'/index/add',
      name:"Add",
      component: Add,
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
