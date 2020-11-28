import {
  reqMemberList
} from "../../util/request"

const state = {
  memberList: [],
}

const mutations = {
  changeList(state, arr) {
    state.memberList = arr
  },
}


const actions = {
  reqMemberchangeList(context) {
    reqMemberList().then(res => {
      context.commit("changeList", res.data.list)
    })
  }
}

const getters = {
  memberList(state) {
    return state.memberList
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
