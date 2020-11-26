<template>
  <div>
    <el-dialog :title="mytitle.mytitle" :visible.sync="addBtnStatus.isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="btn">
          <el-button
            type="primary"
            class="btnsure"
            @click="sendData()"
            v-if="mytitle.mytitle == '菜单添加'"
            >添 加</el-button
          >
          <el-button
            type="primary"
            class="btnsure"
            v-if="mytitle.mytitle == '菜单修改'"
            @click="editall"
            >修 改</el-button
          >
          <el-button class="btncancle" @click="cancle">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqManagerAdd } from "../../../util/request";
import { success, warning } from "../../../util/alert";

// 引入 routeChildren用来渲染  菜单地址的下拉框
import { routeChildren } from "../../../router/index";

// 获取一条数据  oneMessage
import { oneManagerMessage } from "../../../util/request";

import { menuManagerEdit } from "../../../util/request";
export default {
  props: [
    // 从父亲发过来的的数据  别忘了加 ""
    "addBtnStatus",
    "mytitle",
  ],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        status: 1,
        password: "",
        username: "",
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
      managerList: "manager/managerList",
    }),
  },
  methods: {
    ...mapActions({
      reqManagerchangeList: "manager/reqManagerchangeList",
      reqRolechangeList: "role/reqRolechangeList",
      reqtotalCount: "manager/reqtotalCount",
    }),
    onSubmit() {},
    cancle() {
      this.addBtnStatus.isShow = false;
      this.form = {
        roleid: "",
        status: 1,
        password: "",
        username: "",
      };
    },
    sendData() {
      // 千万不要忘了传参数！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
      reqManagerAdd(this.form).then((res) => {
        console.log(this.form);
        // 关闭当前的弹窗
        this.addBtnStatus.isShow = false;
        if (res.data.code == 200) {
          success(res.data.msg);
        } else {
          warning(res.data.msg);
        }
        this.form = {
          roleid: "",
          status: 1,
          password: "",
          username: "",
        };
        // 刷新数据！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        this.reqManagerchangeList();
        this.reqtotalCount();
      });
    },

    // 这个changeStatus 是用来让radio框根据上级菜单的状态来自贡改变的所以用到了@change
    changeStatus() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },

    // 这里做的是  父组件通过ref来触发我这个方法的执行
    // id 为
    getOne(id) {
      oneManagerMessage(id).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
        // 这里做一步操作 目的是为了下面修改接口需要有一个id
        // 这里做的是  将返回的一条数据的 menu 设置checkbox的选中状态
        this.form.id = id;
      });
      this.form = {
        roleid: "",
        status: 1,
        password: "",
        username: "",
      };
      this.reqManagerchangeList();
      this.reqRolechangeList();
    },

    // 这里是 修改接口
    // 形参
    editall() {
      menuManagerEdit(this.form).then((res) => {
        // 关闭当前的弹窗
        this.addBtnStatus.isShow = false;
        this.reqManagerchangeList();
        this.reqRolechangeList();
      });
      this.form = {
        roleid: "",
        status: 1,
        password: "",
        username: "",
      };
    },
  },
  mounted() {
    if (this.roleList.length === 0) {
      this.reqRolechangeList();
    }

    if (this.managerList.length === 0) {
      this.reqManagerchangeList();
    }
  },
};
</script>
<style scoped>
.btn {
  text-align: center;
}
</style>