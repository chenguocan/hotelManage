import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from "../views/Login.vue"
import Welcome from "@/views/Welcome";
import NotFound from "@/views/NotFound";
import ItemType from "@/views/ItemType/ItemType";
import TypeMessage from "@/views/ItemType/TypeMessage";
import AddType from "@/views/Add/AddType";
import AddImage from "@/views/Add/AddImage";
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path:'/',
    redirect: "/index",
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },{
    path:"/index",
    component: Index,
    children:[{
      path:'/index/',
      redirect:'/index/welcome'
    },
    {
      path:'/index/welcome',
      component:Welcome,
    },{
      path:'/index/itemtype',
      component: ItemType
    },{
      path:'/index/message',
      component: TypeMessage,
    },{
      path:'/index/addtype',
      component: AddType
    },{
      path:'/index/addimg',
      component: AddImage
    }]
  },
  {
    path:'*',
    redirect:'/notfound',
  },
  {
    path:'/notfound',
    component: NotFound
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  if (to.path === "/login") {
    return next();
  }
  const tokenStr = window.sessionStorage.getItem("uid");
  if (!tokenStr) {
    return next("/login");
  }
  next();
})

export default router
