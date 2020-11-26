<template>
  <div>
    <el-dialog :title="mytitle.mytitle" :visible.sync="addBtnStatus.isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>

        <!-- 角色权限 -->
        <el-tree
          :data="list"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'title' }"
          ref="tree"
        >
        </el-tree>

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
import { reqRoleAdd } from "../../../util/request";
import { success, warning } from "../../../util/alert";

// 引入 routeChildren用来渲染  菜单地址的下拉框
import { routeChildren } from "../../../router/index";

// 获取一条数据  oneMessage
import { oneRoleMessage } from "../../../util/request";

import { menuRoleEdit } from "../../../util/request";
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
        rolename: "",
        status: 1,
        menus: "[]",
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
      roleList: "role/roleList",
    }),
  },
  methods: {
    ...mapActions({
      reqchangeList: "menu/reqchangeList",
      reqRolechangeList: "role/reqRolechangeList",
    }),
    onSubmit() {},
    cancle() {
      this.addBtnStatus.isShow = false;
      this.form = {
        rolename: "",
        status: 1,
        menus: "[]",
      };
    },
    sendData() {
      // 千万不要忘了传参数！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        // 关闭当前的弹窗

        this.addBtnStatus.isShow = false;
        if (res.data.code == 200) {
          success(res.data.msg);
        } else {
          warning(res.data.msg);
        }
        this.form = {
          rolename: "",
          status: 1,
          menus: "[]",
        };
        // 刷新数据！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        this.reqchangeList();
        this.reqRolechangeList();
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
      oneRoleMessage(id).then((res) => {
        this.form = res.data.list;
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
        // 这里做一步操作 目的是为了下面修改接口需要有一个id
        // 这里做的是  将返回的一条数据的 menu 设置checkbox的选中状态
        console.log(JSON.parse(res.data.list.menus));
        this.form.id = id;
      });
      this.form = {
        rolename: "",
        status: 1,
        menus: "[]",
      };
      this.reqchangeList();
      this.reqRolechangeList();
    },

    // 这里是 修改接口
    // 形参
    editall() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      menuRoleEdit(this.form).then((res) => {
        // 关闭当前的弹窗
        this.addBtnStatus.isShow = false;
        this.reqchangeList();
        this.reqRolechangeList();
      });
      this.form = {
        rolename: "",
        status: 1,
        menus: "[]",
      };
    },
  },
  mounted() {
    if (this.roleList.length === 0) {
      this.reqRolechangeList();
    };
    if (this.list.length === 0) {
      this.reqchangeList();
    };
    
  },
};
</script>
<style scoped>
.btn {
  text-align: center;
}
</style>