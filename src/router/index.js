import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from "../views/Login.vue"
import Welcome from "@/views/Welcome";
import AddStation from "@/views/Station/AddStation";
import NotFound from "@/views/NotFound";
import Person from "@/views/Person/Person";
import Select from "@/views/Station/Select";
import StationDetail from "@/views/Station/StationDetail";
import RentDetail from "@/views/Rent/RentDetail";
import Option from "@/views/Rent/Option";
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: "/index",
    meta: {requireAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },{
    path:"/index",
    component: Index,
    meta: {requireAuth: true},
    children:[{
      path:'/',
      redirect:'/index/welcome'
    },
    {
      path:'/index/welcome',
      component:Welcome,
    },
    {
      path:'/index/add',
      component: AddStation,
    },{
      path:'/index/person',
      component: Person
    },{
      path:'/index/stationdetail',
      component: StationDetail,
    },{
      path:'/index/select',
      component:Select,
    },{
      path: '/index/rentdetail',
      component: RentDetail
    },{
      path:'/index/option',
      component: Option
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
  if(to.meta.requireAuth===true){
    const tokenStr = localStorage.getItem("token");
    if(!tokenStr){
      return next("/login");
    }else{
      return next();
    }
  }
  next();
})

export default router
