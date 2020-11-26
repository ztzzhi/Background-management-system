import Vue from 'vue'
import Router from 'vue-router'


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

const routerAll = new Router({
  routes: [{
      path: "/",
      component: () => import("../pages/index/index"),
      children: [{
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
    }, {
      path: "/login",
      name: "登录页面",
      component: () => import("../pages/login/login")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
})

export default routerAll



