<template>
  <div>
    <el-dialog :title="mytitle.mytitle" :visible.sync="addBtnStatus.isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" placeholder="请选择" @change="changeStatus">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio-group v-model="form.type" disabled>
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>

      <!--如果选中了目录  就显示菜单图标   否则显示菜单地址  -->
        <el-form-item label="菜单图标" v-if="form.type==1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item"
              ><i :class="item"></i
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-if="form.type==2">
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in routeChildren"
              :key="item.path"
              :value="item.path"
              :label="item.name"
            ></el-option>
          </el-select>
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
          <el-button type="primary" class="btnsure" @click="sendData()"
             v-if="mytitle.mytitle=='菜单添加'">添 加</el-button
          >
          <el-button type="primary" class="btnsure" 
             v-if="mytitle.mytitle=='菜单修改'" @click="editall">修 改</el-button
          >
          <el-button class="btncancle" @click="cancle">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuAdd } from "../../../util/request";
import { success, warning } from "../../../util/alert";

// 引入 routeChildren用来渲染  菜单地址的下拉框
import {routeChildren} from "../../../router/index";

// 获取一条数据  oneMessage
import {oneMessage} from "../../../util/request"

import {menuEdit} from "../../../util/request"
export default {
  props: [
    // 从父亲发过来的的数据  别忘了加 ""
    "addBtnStatus",
    "mytitle"
  ],
  components: {
    
  },
  data() {
    return {
      
      routeChildren:routeChildren,
      icons: [
        "el-icon-goods",
        "el-icon-star-off",
        "el-icon-bell",
        "el-icon-s-promotion",
      ],
      form: {
        title: "",
        pid: "",
        status: 1,
        type: 1,
        icon: "",
        url: "",
      },
      formLabelWidth: "120px",
      // 请求数据  add页面无法自动触发这个方法  需要在
      // 这里需要被触发  父中需要使用 refs来触发

    }
  },
  computed: {
    ...mapGetters({
      list:"menu/list"
    }),
  },
  methods: {
    ...mapActions({
      reqchangeList:"menu/reqchangeList"
    }),
    onSubmit() {},
    cancle() {
      this.addBtnStatus.isShow = false;
      this.form = {
        title: "",
        pid: "",
        status: 1,
        type: 1,
        icons: "",
      };
      
    },
    sendData() {
      // 千万不要忘了传参数！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
      reqMenuAdd(this.form).then((res) => {
        // 关闭当前的弹窗
        this.addBtnStatus.isShow = false;
        if (res.data.code == 200) {
          success(res.data.msg);
        } else {
          warning(res.data.msg);
        }
        this.form = {
          title: "",
          pid: "",
          status: 1,
          type: 1,
          icons: "",
        }
        // 刷新数据！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        this.reqchangeList()
      });
    },

    // 这个changeStatus 是用来让radio框根据上级菜单的状态来自贡改变的所以用到了@change  
      changeStatus(){
        if(this.form.pid==0){
          this.form.type=1
        }else{
          this.form.type=2
        }
      },


      // 这里做的是  父组件通过ref来触发我这个方法的执行
      // id 为
      getOne(id){
        oneMessage(id).then(res=>{
          // console.log(res);
          this.form = res.data.list
          // 这里做一步操作 目的是为了下面修改接口需要有一个id
          this.form.id = id 
          // console.log(this.form);
        })
      },

      // 这里是 修改接口
      // 形参
      editall(){
        menuEdit(this.form).then(res=>{
          // console.log(this.form);
          // console.log(res);
          // 关闭当前的弹窗
        this.addBtnStatus.isShow = false;
        this.reqchangeList()
        })
      }


  },

};
</script>
<style scoped>
.btn {
  text-align: center;
}
</style>