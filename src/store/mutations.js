
export const state={
  // 将登陆的信息存到store
  // 如果userInfo没有的时候  将sessionStorage中的值取出来  别忘了转换成串
  userInfo:{}?JSON.parse(sessionStorage.getItem("userInfo")):userInfo
};

export const mutations = {
  changeStore(state,info){
    state.userInfo = info
    // // 在本地也存一份
    // sessionStorage.setItem("userInfo",JSON.stringify(info))
  }
};

export const getters={
  userInfo(state){
    return state.userInfo
  }
}

