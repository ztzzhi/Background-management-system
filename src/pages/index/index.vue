<template>
  <div class="index">
    <el-container class="indexbox">
      <el-aside width="200px" class="indexleft">
        <el-col>
          <el-menu
            :default-active="activerouter"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#20222a"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >

            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
              
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/menu">菜单管理</el-menu-item>
                <el-menu-item index="/role">角色管理</el-menu-item>
                <el-menu-item index="/manager">管理员管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/cate">商品分类</el-menu-item>
                <el-menu-item index="/specs">商品规格</el-menu-item>
                <el-menu-item index="/goods">商品管理</el-menu-item>
                <el-menu-item index="/member">会员管理</el-menu-item>
                <el-menu-item index="/banner">轮播图管理</el-menu-item>
                <el-menu-item index="/seckill">秒杀活动</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header class="indexheader"> 头部 </el-header>
        <el-main class="indexmain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {
      // 解决刷新后  高亮显示不正确的问题
      activerouter: ""
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
  },
  mounted() {

    // 解决刷新页面高亮显示错误问题

      // 页面手动刷新指定路由
    //获取地址栏中的路由，设置elementui中的导航栏选中状态
    let defaultMenu = window.location.hash.substr(
      window.location.hash.indexOf("/")
    );
    this.activerouter = defaultMenu;
  },
};
</script>
<style scoped>
.indexbox {
  width: 100vw;
  height: 100vh;
}
.indexleft {
  background-color: #20222a;
}
.indexheader {
  background-color: #b3c0d1;
}
.indexmain {
  background-color: #fff;
}
</style>