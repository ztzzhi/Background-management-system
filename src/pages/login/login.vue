<template>
  <div class="login">
    <div class="box">
      <h1>登录</h1>
      <el-input
        class="boxipt"
        v-model="info.username"
        placeholder="请输入账号"
      ></el-input>
      <el-input
        class="boxipt"
        v-model="info.password"
        placeholder="请输入密码"
      ></el-input>
      <el-button type="primary" class="loginbtn" @click="log">登录</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { userLogin } from "../../util/request";
import { success, warning } from "../../util/alert";
export default {
  props: [],
  components: {},
  data() {
    return {
      info: {
        username: "",
        password: "",
      }, 
    };
  },
  computed: {
    ...mapGetters({
      userInfo:" "
    }),
  },
  methods: {
    ...mapActions({
      reqChangeStore:"reqChangeStore"
    }),
    log() {
      userLogin(this.info).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          // 把返回数据的info穿进去？？？？？？？？？？？？？？？？？？？？？？
          console.log(res);
          this.reqChangeStore(res.data.list)
          // 本地存储存一份
          sessionStorage.setItem('userInfo',JSON.stringify(res.data.list) )
          this.$router.push("/")
        } else {
          warning(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563544, #323d5e);
  position: relative;
}
.box {
  position: absolute;
  width: 500px;
  height: 300px;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
}
.box h1 {
  text-align: center;
  color: teal;
}
.box .boxipt {
  width: 400px;
  margin-left: 50px;
  margin-bottom: 20px;
}
.loginbtn {
  width: 400px;
  margin-left: 50px;
}
</style>