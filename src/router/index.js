import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from "../views/Login.vue"
import NotFound from "@/views/NotFound";
import AddImg from "@/views/AddImg";
Vue.use(VueRouter)

/*const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}*/

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
      component:AddImg,
    }, {
      path:"/index/image",
      component: AddImg
    }
    ]
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
  mode: 'hash',
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
