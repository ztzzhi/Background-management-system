import {reqMenuList} from "../../util/request"

const state ={
  list:[]
}

const mutations = {
  // 这里用来得到数据后修改list
  changeList(state,arr){
    state.list = arr
  }
}


const actions = {
  reqchangeList(context){
    reqMenuList().then(res=>{
      context.commit("changeList",res.data.list)
    })
  }
}

const getters ={
  list(state){
    return state.list
  }
}

export default{
  state,
  mutations,
  actions,
  getters,
  // 使用命名空间！！！！！！！！！！！！！！！！！！！！！！！！
  namespaced: true
}