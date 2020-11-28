<template>
  <div>
    <el-dialog :title="mytitle.mytitle" :visible.sync="addBtnStatus.isShow" @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone" ></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password" ></el-input>
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
import { success, warning } from "../../../util/alert";

// 获取一条数据  oneCateMessage
import { oneMemberMessage } from "../../../util/request";

import { menuMemberEdit } from "../../../util/request";
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
        pid: "",
        status: 1,
        password: "",
        phone:"",
        nickname:"",
        firstPw:""
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      memberList:"member/memberList"
    }),
  },
  methods: {
    close(){
      this.cancle()
    },
    ...mapActions({
      reqMemberchangeList:"member/reqMemberchangeList"
    }),
    onSubmit() {},
    cancle() {
      this.addBtnStatus.isShow = false;
      this.form = {
        pid: "",
        status: 1,
        password: "",
        phone:"",
        nickname:""
      };
    },



    // 这里做的是  父组件通过ref来触发我这个方法的执行
    // id 为
    getOne(uid) {
      oneMemberMessage(uid).then((res) => {
        this.form = res.data.list
        this.form.firstPw = this.form.password
        this.form.password = ""
      });
    },

    editall() {
      if(this.form.password==""){
        // 说明密码没修改
        this.form.password = this.form.firstPw
      }
      menuMemberEdit(this.form).then((res) => {
        if(res.data.code == 200){
          success(res.data.msg)
          this.cancle();
        }else {
          warning(res.data.msg);
        } 
        this.reqMemberchangeList();
      });
      
    },
  },
  mounted() {

    this.reqMemberchangeList();

  },
};
</script>
<style scoped>
.btn {
  text-align: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>