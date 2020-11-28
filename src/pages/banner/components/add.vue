<template>
  <div>
    <el-dialog :title="mytitle.mytitle" :visible.sync="addBtnStatus.isShow" @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" ></el-input>
        </el-form-item>

        <el-form-item label="图片">
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
import { success, warning } from "../../../util/alert";

// 获取一条数据  oneCateMessage
import { oneBannerMessage } from "../../../util/request";
import { reqBannerAdd } from "../../../util/request";

import { menuBannerEdit } from "../../../util/request";
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
        title: "",
        img: "",
        status:1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      bannerList:"banner/bannerList"
    }),
  },
  methods: {
    // 当图片选中时  应该把图片渲染到里面
    imgChange(e){
      this.imageUrl = URL.createObjectURL(e.raw)
      this.form.img = e.raw
    },
    sendData() {
      reqBannerAdd(this.form).then((res) => {
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
        this.reqBannerchangeList();
      });
    },
    close(){
      this.cancle()
    },
    ...mapActions({
      reqBannerchangeList:"banner/reqBannerchangeList"
    }),
    onSubmit() {},
    cancle() {
      this.addBtnStatus.isShow = false;
      this.form = {
        title: "",
        img: "",
        status:1,
      };
      this.imageUrl = ''
    },

    // 这里做的是  父组件通过ref来触发我这个方法的执行
    // id 为
    getOne(id) {
      oneBannerMessage(id).then((res) => {
        console.log(res);
        this.form = res.data.list
        this.imageUrl = this.$Img+this.form.img 
        this.form.id = id
      });
    },

    editall() {
      menuBannerEdit(this.form).then((res) => {
        if(res.data.code == 200){
          success(res.data.msg)
          this.cancle();
        }else {
          warning(res.data.msg);
        } 
        this.reqBannerchangeList();
      });
      
    },
  },
  mounted() {

    this.reqBannerchangeList();

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