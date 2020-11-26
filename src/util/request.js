// 这个文件是用来做数据请求的
import Vue from "vue"
import axios from "axios"
import qs from "qs"


//生产环境下 
let baseUrl = "/api"
Vue.prototype.$Img = "http://localhost:3000/"

//请求拦截
  axios.interceptors.request.use(res=>{
    console.group("本次发送的数据是");
    console.log(res);
    // 拦截后不要忘了 return res     再将数据发送给后端
    console.groupEnd("*************")
    return res
  })


  axios.interceptors.response.use(res=>{
    console.log("本次请求的数据是");
    console.log(res);
    // 拦截后 不要忘了再把数据 发送给前端  return res
    return res
  })

// 相应拦截


console.log("*".repeat(50));
// ***************************************menu数据请求********************************************************
// 请求菜单添加的数据
export const reqMenuAdd=(form)=>{
  return axios({
    url:baseUrl+"/api/menuadd",
    method:"post",
    data:qs.stringify(form)
  })
}
// 请求菜单列表

export const reqMenuList=()=>{
  return axios({
    url:baseUrl+"/api/menulist",
    method:"get",
    params:{
      istree:true
    }
  })
}

// 列表删除功能
export const delList=(id)=>{
  return axios({
    url:baseUrl+"/api/menudelete",
    method:"post",
    data:qs.stringify({
      id:id
    })
  })
}

// 获取一条数据

export const oneMessage=(id)=>{
  return axios({
    url:baseUrl+"/api/menuinfo",
    method:"get",
    params:{
      id:id
    }
  })
}


// 菜单修改
export const menuEdit=(formall)=>{
  return axios({
    url:baseUrl+"/api/menuedit",
    method:"post",
    data:qs.stringify(formall)
  })
}


// ***************************************role数据请求********************************************************
// 请求role添加的数据
export const reqRoleAdd=(form)=>{
  return axios({
    url:baseUrl+"/api/roleadd",
    method:"post",
    data:qs.stringify(form)
  })
}
// 请求role列表

export const reqRoleList=()=>{
  return axios({
    url:baseUrl+"/api/rolelist",
    method:"get",
    params:{
      istree:true
    }
  })
}

// role列表删除功能
export const delRoleList=(id)=>{
  return axios({
    url:baseUrl+"/api/roledelete",
    method:"post",
    data:qs.stringify({
      id:id
    })
  })
}

// role获取一条数据

export const oneRoleMessage=(id)=>{
  return axios({
    url:baseUrl+"/api/roleinfo",
    method:"get",
    params:{
      id:id
    }
  })
}


// role菜单修改
export const menuRoleEdit=(formall)=>{
  return axios({
    url:baseUrl+"/api/roleedit",
    method:"post",
    data:qs.stringify(formall)
  })
}

// ***************************************manager数据请求********************************************************
// 请求role添加的数据
export const reqManagerAdd=(form)=>{
  return axios({
    url:baseUrl+"/api/useradd",
    method:"post",
    data:qs.stringify(form)
  })
}
// 请求role列表

export const reqManagerList=(params)=>{
  return axios({
    url:baseUrl+"/api/userlist",
    method:"get",
    params:params
  })
}

// Manager列表删除功能
export const delManagerList=(uid)=>{
  return axios({
    url:baseUrl+"/api/userdelete",
    method:"post",
    data:qs.stringify({
      uid:uid
    })
  })
}

// Manager获取一条数据

export const oneManagerMessage=(uid)=>{
  return axios({
    url:baseUrl+"/api/userinfo",
    method:"get",
    params:{
      uid:uid
    }
  })
}


// Manager菜单修改
export const menuManagerEdit=(formall)=>{
  return axios({
    url:baseUrl+"/api/useredit",
    method:"post",
    data:qs.stringify(formall)
  })
}


// Manager管理员登录
export const userLogin=(info)=>{
  return axios({
    url:baseUrl+"/api/userlogin",
    method:"post",
    data:qs.stringify(info)
  })
}

// Manager分页总数
export const menuManagerCount=()=>{
  return axios({
    url:baseUrl+"/api/usercount",
    method:"get",
  })
}

// ***************************************Cate数据请求********************************************************
// 请求cate添加的数据
export const reqCateAdd=(form)=>{
  let data = new FormData()
  for(let key in form){
    data.append(key,form[key])
  }
  
  return axios({
    url:baseUrl+"/api/cateadd",
    method:"post",
    data:data
  })
}
// 请求cate列表

export const reqCateList=()=>{
  return axios({
    url:baseUrl+"/api/catelist",
    method:"get",
    params:{
      istree:true,
      
    }
  })
}

// cate列表删除功能
export const delCateList=(id)=>{
  return axios({
    url:baseUrl+"/api/catedelete",
    method:"post",
    data:qs.stringify({
      id:id
    })
  })
}

// cate获取一条数据

export const oneCateMessage=(id)=>{
  return axios({
    url:baseUrl+"/api/cateinfo",
    method:"get",
    params:{
      id:id
    }
  })
}


// cate菜单修改
export const menuCateEdit=(formall)=>{
  let data = new FormData()
  for(let key in formall){
    data.append(key,formall[key])
  }
  return axios({
    url:baseUrl+"/api/cateedit",
    method:"post",
    data:data
  })
}


// ***************************************specs数据请求********************************************************
// 请求specs添加的数据
export const reqSpecsAdd=(form)=>{
  return axios({
    url:baseUrl+"/api/specsadd",
    method:"post",
    data:qs.stringify(form)
  })
}
// 请求specs列表

export const reqSpecsList=(params)=>{
  return axios({
    url:baseUrl+"/api/specslist",
    method:"get",
    params:params
  })
}

// specs列表删除功能
export const delSpecsList=(id)=>{
  return axios({
    url:baseUrl+"/api/specsdelete",
    method:"post",
    data:qs.stringify({
      id:id
    })
  })
}

// specs获取一条数据

export const oneSpecsMessage=(id)=>{
  return axios({
    url:baseUrl+"/api/specsinfo",
    method:"get",
    params:{
      id:id
    }
  })
}

// specs菜单修改
export const menuSpecsEdit=(formall)=>{
  return axios({
    url:baseUrl+"/api/specsedit",
    method:"post",
    data:qs.stringify(formall)
  })
}


// specs分页总数
export const menuSpecsCount=()=>{
  return axios({
    url:baseUrl+"/api/specscount",
    method:"get",
  })
}


// ***************************************goods数据请求********************************************************
// 请求goods添加的数据
export const reqGoodsAdd=(form)=>{
  let data = new FormData()
  for(let key in form){
    data.append(key,form[key])
  }
  return axios({
    url:baseUrl+"/api/goodsadd",
    method:"post",
    data:data
  })
}
// 请求goods列表

export const reqGoodsList=(params)=>{
  return axios({
    url:baseUrl+"/api/goodslist",
    method:"get",
    params:params
  })
}

//goods中请求cate分类表中的二级分类数据
export const reqSecondData=({istree:x,pid:pid})=>{
  return axios({
    url:baseUrl+"/api/catelist",
    method:"get",
    params:{
      istree:x,
      pid:pid
    }
  })
} 


// goods列表删除功能
export const delGoodsList=(id)=>{
  return axios({
    url:baseUrl+"/api/goodsdelete",
    method:"post",
    data:qs.stringify({
      id:id
    })
  })
}

// goods获取一条数据

export const oneGoodsMessage=(id)=>{
  return axios({
    url:baseUrl+"/api/goodsinfo",
    method:"get",
    params:{
      id:id
    }
  })
}

// goods菜单修改
export const menuGoodsEdit=(formall)=>{
  let data = new FormData()
  for(let key in formall){
    data.append(key,formall[key])
  }
  return axios({
    url:baseUrl+"/api/goodsedit",
    method:"post",
    data:data
  })
}


// goods分页总数
export const menuGoodsCount=()=>{
  return axios({
    url:baseUrl+"/api/goodscount",
    method:"get",
  })
}