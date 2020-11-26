<template>
  <div>
    <el-dialog :title="mytitle.mytitle" :visible.sync="addBtnStatus.isShow" @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <!-- 图片上传 -->

        <el-form-item label="图片上传">
          <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="imgChange"
        >

        <!-- on-change  是一个属性  不是一个点击事件   所以用 ：  而不是用@ ！！！！！！！！！！！ -->
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import { reqCateAdd } from "../../../util/request";
import { success, warning } from "../../../util/alert";

// 引入 routeChildren用来渲染  菜单地址的下拉框
import { routeChildren } from "../../../router/index";

// 获取一条数据  oneCateMessage
import { oneCateMessage } from "../../../util/request";

import { menuCateEdit } from "../../../util/request";
export default {
  props: [
    // 从父亲发过来的的数据  别忘了加 ""
    "addBtnStatus",
    "mytitle",
  ],
  components: {},
  data() {
    return {
      imageUrl:"",
      form: {
        pid: "",
        status: 1,
        catename: "",
        img:""
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      catelist:"cate/catelist"
    }),
  },
  methods: {
    close(){
      this.cancle()
    },
    imgChange(e){
      // console.log(e);
      // 判断上传的图片大小  如果大于2M会弹出警告框并且结束下面代码的执行
      if(e.raw.size>2*1024*1024){
        warning("图片大小超出2M")
        return
      }
      this.imageUrl = URL.createObjectURL(e.raw)
      this.form.img = e.raw
      
    },
    ...mapActions({
      reqCateListActions:"cate/reqCateListActions"
    }),
    onSubmit() {},
    cancle() {
      this.addBtnStatus.isShow = false;
      this.form = {
        pid: "",
        status: 1,
        catename: "",
        img:""
      };
      this.imageUrl = ''
    },
    sendData() {
      reqCateAdd(this.form).then((res) => {
        console.log(this.form);
        // 关闭当前的弹窗
        this.addBtnStatus.isShow = false;
        if (res.data.code == 200) {
          success(res.data.msg);
        } else {
          warning(res.data.msg);
        }
        this.cancle()
        // 刷新数据！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        this.reqCateListActions();
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
      oneCateMessage(id).then((res) => {
        this.form = res.data.list
        this.imageUrl = this.$Img + res.data.list.img
        this.form.id = id

        // 如果点击编辑本身没有图片 要做一步处理
        if(this.form.img=="null"){
          this.imageUrl = ''
        }
        // 这里做一步操作 目的是为了下面修改接口需要有一个id
        // 这里做的是  将返回的一条数据的 menu 设置checkbox的选中状态
      });
      // this.cancle();
      // this.reqCateListActions();
    },

    // 这里是 修改接口
    // 形参
    editall() {
      menuCateEdit(this.form).then((res) => {
        console.log(this.form);
        // 关闭当前的弹窗
        if(res.data.code == 200){
          success(res.data.msg)
          this.cancle();
        }else {
          warning(res.data.msg);
        } 
        this.reqCateListActions();
      });
      
    },
  },
  mounted() {
    if (this.reqCateListActions.length === 0) {
      this.reqCateListActions();
    }
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