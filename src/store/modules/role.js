import {reqRoleList} from "../../util/request"

const state ={
  roleList:[],
}

const mutations = {
  // 这里用来得到数据后修改roleList
  changeList(state,arr){
    state.roleList = arr
  }
}


const actions = {
  reqRolechangeList(context){
    reqRoleList().then(res=>{
      context.commit("changeList",res.data.list)
    })
  }
}

const getters ={
  roleList(state){
    return state.roleList
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