<template>
  <div>
    <el-dialog
      :title="mytitle.mytitle"
      :visible.sync="addBtnStatus.isShow"
      @close="close"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="secondDataGet">
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid">
            <el-option
              v-for="item in secondData"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

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

        <el-form-item label="商品规格">
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="secondSpecsChange"
          >
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性">
          <!-- v-model是初始框中的数据  和:label最大的区别是 v-model中的数据再编辑的时候 应该保持和当初添加 -->
          <el-select v-model="form.specsattr" multiple>
            <el-option
              placeholder="请选择"
              v-for="item in specsArr"
              :key="item.id"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio-group v-model="form.isnew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio-group v-model="form.ishot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="备注">
          <div id="div1"></div>
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
//富文本编辑器
import E from "wangeditor";

import { mapGetters, mapActions } from "vuex";
import { reqGoodsAdd } from "../../../util/request";
import { success, warning } from "../../../util/alert";
// 这里是 分类页面的二级菜单获取
import { reqSecondData } from "../../../util/request";
// 获取一条数据  oneMessage
import { oneGoodsMessage } from "../../../util/request";

import { menuGoodsEdit } from "../../../util/request";
export default {
  props: [
    // 从父亲发过来的的数据  别忘了加 ""
    "addBtnStatus",
    "mytitle",
  ],
  components: {},
  data() {
    return {
      imageUrl: "",
      secondData: [],
      specsArr: [],
      form: {
        first_cateid: "",
        second_cateid: "",
        img: "",
        goodsname: "",
        price: "",
        market_price: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
        description: "",
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      catelist: "cate/catelist",
      specsList: "specs/specsList",
      goodsList: "goods/goodsList",
    }),
  },
  methods: {
    opened() {
      this.editor = new E("#div1");
      this.editor.create();
    },
    // 当分类页的input框选择时  获取二级分类的数据并渲染
    secondDataGet() {
      reqSecondData({ istree: true, pid: this.form.first_cateid }).then(
        (res) => {
          // catelist 通过id 找pid
          // 当一级分类框发生变化时 二级分类应该清空
          this.form.second_cateid = "";
          this.secondData = res.data.list;
        }
      );
    },

    secondSpecsChange() {
      this.specsArr = [];
      this.form.specsattr = [];
      let specsArr1 = this.specsList.find((ele) => {
        return ele.id == this.form.specsid;
      });
      this.specsArr = specsArr1.attrs;
    },
    // 当上传的图片框发生变化时
    imgChange(e) {
      console.log(e);
      let file = e.raw;
      // 将图片转换成能看到的图片
      this.imageUrl = URL.createObjectURL(file);
      // 这里将form中的img改成了file这个对象  目的是为了提交数据给后端
      this.form.img = file;
    },
    close() {
      this.addBtnStatus.isShow = false;
      (this.form = {
        first_cateid: "",
        second_cateid: "",
        img: "",
        goodsname: "",
        price: "",
        market_price: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
        description: "",
      }),
        (this.imageUrl = "");
      this.secondData = "";
    },

    ...mapActions({
      reqCateListActions: "cate/reqCateListActions",
      reqSpecschangeList: "specs/reqSpecschangeList",
      reqtotalCount: "specs/reqtotalCount",
      reqGoodschangeList: "goods/reqGoodschangeList",
    }),
    onSubmit() {},
    cancle() {
      this.addBtnStatus.isShow = false;
      this.form = {
        first_cateid: "",
        second_cateid: "",
        img: "",
        goodsname: "",
        price: "",
        market_price: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imageUrl = "";
      this.secondData = "";
      this.editor.destroy()
    },
    // 这里需要对数据进行处理  后台要的数据是  '[黑色，白色，红色]'
    sendData() {
      this.form.description = this.editor.txt.html()
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      reqGoodsAdd(this.form).then((res) => {
        // 关闭当前的弹窗
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancle();
          this.reqGoodschangeList();
          this.reqtotalCount();
        } else {
          warning(res.data.msg);
        }
      });
    },

    // 这里做的是  父组件通过ref来触发我这个方法的执行
    getOne(id) {
      oneGoodsMessage(id).then((res) => {
        this.form = res.data.list;
        // $Img 不要忘了  前面加上this
        this.imageUrl = this.$Img + res.data.list.img;
        this.editor.txt.html(this.form.description)
        // 根据一级列表渲染二级列表的数据
        reqSecondData({ istree: true, pid: this.form.first_cateid }).then(
          (res) => {
            // 用于渲染二级分类
            this.secondData = res.data.list;
          }
        );

        // 先把this.form.specsattr的值显示成  数组
        this.form.specsattr = JSON.parse(this.form.specsattr);
        // let newArr = res.data.list.forEach()
        let obj = this.specsList.find((ele) => {
          return ele.id == this.form.specsid;
        });
        this.specsArr = obj.attrs;
        this.form.id = id;
      });
    },

    // 这里是 修改接口
    // 形参
    editall() {
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      this.form.description = this.editor.txt.html() 
      menuGoodsEdit(this.form).then((res) => {
        // 关闭当前的弹窗
        this.addBtnStatus.isShow = false;
        this.reqGoodschangeList();
        this.cancle();
      });
      
    },
  },
  mounted() {
    if (this.specsList.length === 0) {
      this.reqSpecschangeList();
    }
    if (this.catelist.length === 0) {
      this.reqCateListActions();
    }
    if (this.goodsList === 0) {
      this.reqGoodschangeList();
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
#div1 {
  width: 100%;
  height: 100%;
}
</style>