//这个文件是 将所有的全局组件 包装到统一文件中，然后再引入到main.js中！！！

import Vue from "vue"

// 引入各个全局组件

let obj={

}

for(let key in obj){
  // 注册全局组件
  Vue.component(key,obj[key])
}