import {
  reqBannerList
} from "../../util/request"

const state = {
  bannerList: [],
}

const mutations = {
  changeList(state, arr) {
    state.bannerList = arr
  },
}


const actions = {
  reqBannerchangeList(context) {
    reqBannerList().then(res => {
      context.commit("changeList", res.data.list)
    })
  }
}

const getters = {
  bannerList(state) {
    return state.bannerList
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
