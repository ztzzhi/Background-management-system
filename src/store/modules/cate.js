import {reqCateList} from "../../util/request"

const state ={
  catelist:[]
}

const mutations = {
  changeCateList(state,arr){
    state.catelist = arr
  }
}

const actions = {
  reqCateListActions(context){
    reqCateList().then(res=>{
      console.log(res);
      res.data.list.forEach(item=>{
        if(item.img=="null"){
          item.img = ""
        }else{
          item.img = item.img
        }
      })
      context.commit("changeCateList",res.data.list)
    })
  }
}

const getters ={
  catelist(state){
    return state.catelist
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