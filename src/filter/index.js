// 这里做过滤器的集中处理

import Vue from "vue"

let obj = {

}

for(let key in obj){
  Vue.filter(key,obj[key])
}