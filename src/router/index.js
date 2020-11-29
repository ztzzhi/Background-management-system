import Vue from 'vue'
import Router from 'vue-router'
// 引入userInfo 从 store中
import store from "../store/index"

Vue.use(Router)


 export const routeChildren = [{
  path: "/menu",
  name: "菜单管理",
  component: () => import("../pages/menu/menu")
},
{
  path: "/role",
  name: "角色管理",
  component: () => import("../pages/role/role")
},
{
  path: "/manager",
  name: "管理员管理",
  component: () => import("../pages/manager/manager")
},
{
  path: "/cate",
  name: "商品分类",
  component: () => import("../pages/cate/cate")
},
{
  path: "/specs",
  name: "商品规格",
  component: () => import("../pages/specs/specs")
},
{
  path: "/goods",
  name: "商品管理",
  component: () => import("../pages/goods/goods")
},
{
  path: "/member",
  name: "会员管理",
  component: () => import("../pages/member/member")
},
{
  path: "/banner",
  name: "轮播图管理",
  component: () => import("../pages/banner/banner")
},
{
  path: "/seckill",
  name: "秒杀活动",
  component: () => import("../pages/seckill/seckill")
},
]

// 封装一个 路由独享守卫的函数

function toWhere(url,next){
  let menus_url = store.state.userInfo.menus_url
  if(menus_url.includes(url)){
    next()
  }else{
    next("/")
  }
}







const routerAll = new Router({
  routes: [{
      path: "/",
      component: () => import("../pages/index/index"),
      children: [{
          path: "/menu",
          name: "菜单管理",
          component: () => import("../pages/menu/menu"),
          beforeEnter(to,from,next){
            // 取出可以去的地址
            toWhere("/menu",next)
            
          }
        },
        {
          path: "/role",
          name: "角色管理",
          component: () => import("../pages/role/role"),
          beforeEnter(to,from,next){
            // 取出可以去的地址
            toWhere("/role",next)
            
          }
        },
        {
          path: "/manage",
          name: "管理员管理",
          component: () => import("../pages/manager/manager"),
          beforeEnter(to,from,next){
            // 取出可以去的地址
            toWhere("/manage",next)
            
          }
        },
        {
          path: "/cate",
          name: "商品分类",
          component: () => import("../pages/cate/cate"),
          beforeEnter(to,from,next){
            // 取出可以去的地址
            toWhere("/cate",next)
            
          }
        },
        {
          path: "/spec",
          name: "商品规格",
          component: () => import("../pages/specs/specs"),
          beforeEnter(to,from,next){
            // 取出可以去的地址
            toWhere("/spec",next)
            
          }
        },
        {
          path: "/goods",
          name: "商品管理",
          component: () => import("../pages/goods/goods"),
          beforeEnter(to,from,next){
            // 取出可以去的地址
            toWhere("/goods",next)
            
          }
        },
        {
          path: "/member",
          name: "会员管理",
          component: () => import("../pages/member/member"),
          beforeEnter(to,from,next){
            // 取出可以去的地址
            toWhere("/member",next)
            
          }
        },
        {
          path: "/banner",
          name: "轮播图管理",
          component: () => import("../pages/banner/banner"),
          beforeEnter(to,from,next){
            // 取出可以去的地址
            toWhere("/cate",next)
            
          }
        },
        {
          path: "/seckill",
          name: "秒杀活动",
          component: () => import("../pages/seckill/seckill"),
          beforeEnter(to,from,next){
            // 取出可以去的地址
            toWhere("/cate",next)
            
          }
        },
      ]
    }, {
      path: "/login",
      name: "登录页面",
      component: () => import("../pages/login/login")
    },
    // {
    //   path: "*",
    //   redirect: "/"
      
    // }
  ]
})

// routerAll.beforeEach(to,from,next)
  // 取到存到store或者sessionStorage中的数据
  routerAll.beforeEach((to,from,next)=>{
    if(to.path=="/login"){
      next()
    }
    else if(store.state.userInfo.token){
      next()
    }else{
      next("/login")
    }
  })

export default routerAll



