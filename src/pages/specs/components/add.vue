<template>
  <div>
    <el-dialog :title="mytitle.mytitle" :visible.sync="addBtnStatus.isShow" @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性">
          <div v-for="(item, index) in attrsArr" :key="item.id" class="inpBox">
            <el-input v-model="item.value" class="inp"></el-input>
            <el-button
              type="primary"
              class="btn"
              v-if="index == 0"
              @click="addinp"
              >新增规格属性</el-button
            >
            <el-button
              type="danger"
              class="delbtn"
              v-else
              @click="delinp(index)"
              >删除</el-button
            >
          </div>
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
import { reqSpecsAdd } from "../../../util/request";
import { success, warning } from "../../../util/alert";

// 引入 routeChildren用来渲染  菜单地址的下拉框
import { routeChildren } from "../../../router/index";

// 获取一条数据  oneMessage
import { oneSpecsMessage } from "../../../util/request";

import { menuSpecsEdit } from "../../../util/request";
export default {
  props: [
    // 从父亲发过来的的数据  别忘了加 ""
    "addBtnStatus",
    "mytitle",
  ],
  components: {},
  data() {
    return {
      attrsArr: [
        {
          value: "",
        },
        {
          value: "",
        },
      ],
      form: {
        status: 1,
        specsname: "",
        attrs: "[]",
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      specsList: "specs/specsList",
    }),
  },
  methods: {
    close(){
      this.addBtnStatus.isShow = false;
      this.form = {
        status: 1,
        specsname: "",
        attrs: "[]",
      };
      this.attrsArr = [
        {
          value: "",
        },
        {
          value: "",
        },
      ];
    },
    // 这里做的是 点击按钮往attrsArr中添加一条数据
    addinp() {
      this.attrsArr.push({ value: "" });
    },
    delinp(index) {
      this.attrsArr.splice(index, 1);
    },
    ...mapActions({
      reqSpecschangeList: "specs/reqSpecschangeList",
      reqtotalCount: "specs/reqtotalCount",
    }),
    onSubmit() {},
    cancle() {
      this.addBtnStatus.isShow = false;
      this.form = {
        status: 1,
        specsname: "",
        attrs: "[]",
      };
      this.attrsArr = [
        {
          value: "",
        },
        {
          value: "",
        },
      ];
    },
    // 这里需要对数据进行处理  后台要的数据是  '[黑色，白色，红色]'
    sendData() {
      // 这里将数组attrsArr中的值 取出来放到数组里然后将数组转换成  json串
      this.form.attrs = JSON.stringify(
        this.attrsArr = this.attrsArr.map((item) => {
          return item.value;
        })
      );
      reqSpecsAdd(this.form).then((res) => {
        // 关闭当前的弹窗
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancle();
          // 刷新数据！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
          this.reqtotalCount();
          this.reqSpecschangeList();
          
        } else {
          warning(res.data.msg);
        }
      });
    },

    // 这里做的是  父组件通过ref来触发我这个方法的执行
    getOne(id) {
      oneSpecsMessage(id).then((res) => {
        console.log(res);
        this.form = res.data.list[0];
        // 对接受到的数据处理一下
        // 转换成数组 ['x','xl','xxl']  --------->   [{value:""}]
        this.attrsArr = JSON.parse(this.form.attrs).map(item=>{
          return {value:item}
        })
        // 这里做一步操作 目的是为了下面修改接口需要有一个id
        // 这里做的是  将返回的一条数据的 menu 设置checkbox的选中状态
        this.form.id = id;
      });
      
    },

    // 这里是 修改接口
    // 形参
    editall() {
      menuManagerEdit(this.form).then((res) => {
        // 关闭当前的弹窗
        this.addBtnStatus.isShow = false;
        this.reqSpecschangeList();
      });
      this.cancle();
    },
  },
  mounted() {
    if (this.specsList.length === 0) {
      this.reqSpecschangeList();
    }
  },
};
</script>
<style scoped>
.btn {
  text-align: center;
}
.inpBox {
  display: flex;
  margin-bottom: 10px;
}
.inpBox .inp {
  flex: 1;
}
.inpBox .btn {
  width: 150px;
}
.inpBox .delbtn {
  width: 100px;
}
</style>