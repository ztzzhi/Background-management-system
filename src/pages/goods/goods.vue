<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-header">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 引入add组件 -->
    <el-button type="primary" @click="addData">添加</el-button>
    <v-add :addBtnStatus="addBtnStatus" :mytitle="mytitle" ref="aaa"></v-add>
    <v-list :addBtnStatus="addBtnStatus" :mytitle="mytitle" @openAddBtn="openAddBtn"></v-list>
  </div>
</template>
<script>
// 引入add组件
import vAdd from "./components/add";
import vList from "./components/list";
import { mapGetters, mapActions } from "vuex";
// 面包屑内容动态展示 引入
import {routeChildren} from "../../router/index";
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      // 控制子组件add按钮的关闭与打开
      // 这里需要用到传值操作
      // 定义一个isShow来控制 显示与隐藏  并且要传递一个对象过去  实现浅拷贝
      // 传递对象过去 的目的是  ：：：：子组件的状态改变会影响父亲中的isShow的值
      addBtnStatus:{
        isShow:false
      },

      // 这个是 添加/修改的   title
      mytitle:{
        mytitle:"菜单添加"
        }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    addData(){
      this.form = {}
      this.mytitle.mytitle = "菜单添加"
      this.addBtnStatus.isShow = true
    },
    // 这里
    openAddBtn(id){
      this.addBtnStatus.isShow = true
      // 使用ref 来主动触发add中的 getOne方法
      this.$refs.aaa.getOne(id)
    },

  },
  mounted() {},
};
</script>
<style scoped>
.bread-header {
  margin-bottom: 20px;
  height: 40px;
  line-height: 40px;
}
</style>