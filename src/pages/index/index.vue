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
            <el-menu-item index="/home">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <div v-for="item in userInfo.menus" :key="item.id">
              <!-- 这里需要将id转换成字符串  人家要求的时字符串  隐士转换一下即可-->

              <!-- 如果有子标签  就显示下面的-->
            <el-submenu :index="item.id+''" v-if="item.children"> 
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
              <el-menu-item  v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
            </el-menu-item-group>
            </el-submenu>
            <!-- 如果没有父标签  就显示下面的-->
            <el-menu-item-group v-else>
              <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id"><span>{{i.title}}</span></el-menu-item>
            </el-menu-item-group>
            </div>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header class="indexheader">
          用户名：{{userInfo.username}}<el-button @click="logout">退出</el-button>
        </el-header>
        <el-main class="indexmain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import store from '../../store';
export default {
  props: [],
  components: {},
  data() {
    return {
      // 解决刷新后  高亮显示不正确的问题
      activerouter: "",
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeStore: "reqChangeStore",
    }),
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    logout(){
      sessionStorage.removeItem('userInfo')
      this.reqChangeStore({})
      this.$router.push("/login")
    }
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