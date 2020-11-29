import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {mutations,getters,state} from "./mutations"
import {actions} from "./actions"
// 引入modules 中的menu 然后放到 下面的 mudules中
import menu from "../store/modules/menu"
import role from "../store/modules/role"
import manager from "../store/modules/manager"
import cate from "../store/modules/cate"
import specs from "../store/modules/specs"
import goods from "../store/modules/goods"
import member from "../store/modules/member"
import banner from "../store/modules/banner"
import seckill from "../store/modules/seckill"
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    menu,
    role,
    manager,
    cate,
    specs,
    goods,
    member,
    banner,
    seckill
  }
})