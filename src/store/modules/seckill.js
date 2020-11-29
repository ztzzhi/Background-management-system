import {
  reqSeckillList
} from "../../util/request"

const state = {
  seckillList: [],
}

const mutations = {
  changeList(state, arr) {
    state.seckillList = arr
  },
}


const actions = {
  reqSeckillchangeList(context) {
    reqSeckillList().then(res => {
      context.commit("changeList", res.data.list)
    })
  }
}

const getters = {
  seckillList(state) {
    return state.seckillList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  // 使用命名空间！！！！！！！！！！！！！！！！！！！！！！！！
  namespaced: true
}
