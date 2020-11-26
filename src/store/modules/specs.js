import {reqSpecsList} from "../../util/request"
import {menuSpecsCount} from "../../util/request"

const state ={
  specsList:[],
  totalCount:0,
  size:2,
  currentPage:1
}

const mutations = {
  // 这里用来得到数据后修改roleList
  changeList(state,arr){
    state.specsList = arr
  },
  changeCount(state,arr){
    state.totalCount = arr
  },
  changeCurrentPage(state,num){
    // 这个num在页面获取的  e  那里改变
    state.currentPage = num
  }
}


const actions = {
  reqSpecschangeList(context){
    reqSpecsList({size:context.state.size,page:context.state.currentPage}).then(res=>{
      // 这里做一个判断  当我删除数据时 这一页的数据删完了 应该自动跳到上一页 并且请求一下上一页的数据
      // 注意 当前这一页不能为第一个
      let list = res.data.list?res.data.list:[]
      console.log(list);
      // list是个数组 要把里面的attrs都要转换成 JSON.parse()形式
      list.forEach(item=>{
        item.attrs = JSON.parse(item.attrs)
      })
      // list.attrs = JSON.parse(list.attrs)
      if(context.state.currentPage > 1 && list.length==0){
        context.commit("changeCurrentPage",context.state.currentPage-1)
        // 然后再重新请求一下当前页的  数据
        // 如何请求自身函数？   使用context.dispath
        context.dispatch("reqSpecschangeList");
        // return的意思是下面的不执行了
        return;
      }

      

      context.commit("changeList",list)
    })
  },

  // 请求数据条数
  reqtotalCount(context){
    menuSpecsCount().then(res=>{
      context.commit("changeCount",res.data.list[0].total)
    })
  },

  //这里做 修改当前页码currentPage
  reqChangePageActions(context,num){
    context.commit("changeCurrentPage",num)
    // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！注意当page改变了应该重新请求一下list列表的数据
    // 如何请求当前actions中的 reqManagerchangeList？
    // 使用context.dispatch
    context.dispatch('reqSpecschangeList')
  }
}

const getters ={
  specsList(state){
    return state.specsList
  },
  totalCount(state){
    return state.totalCount
  },
  size(state){
    return state.size
  },
  currentPage(state){
    return state.currentPage
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