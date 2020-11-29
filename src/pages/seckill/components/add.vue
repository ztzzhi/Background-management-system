<template>
  <div>
    <el-dialog
      :title="mytitle.mytitle"
      :visible.sync="addBtnStatus.isShow"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="日期">
          <div class="block">
            <el-date-picker
              v-model="mytime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd HH:MM:ss"
              value-format="yyyy-MM-dd HH:MM:ss"
              timestamp="mytime"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changeStatus1"
          >
            <el-option
              placeholder="请选择分类"
              v-for="(item, index) in catelist"
              :key="index"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择"
            @change="changeStatus2"
          >
            <el-option
              placeholder="请选择分类"
              v-for="item in secondList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option
              placeholder="请选择分类"
              :value="thirdList.id"
              :label="thirdList.goodsname"
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
import { oneSeckillMessage } from "../../../util/request";
import { reqSeckillAdd } from "../../../util/request";

import { menuSeckillEdit } from "../../../util/request";
export default {
  props: [
    // 从父亲发过来的的数据  别忘了加 ""
    "addBtnStatus",
    "mytitle",
  ],
  components: {},
  data() {
    return {
      secondList: [],
      thirdList: [],
      mytime:[],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      // 一级分类
      catelist: "cate/catelist",
      // goods
      goodsList: "goods/goodsList",
      // 活动列表
      seckillList: "seckill/seckillList",
    }),
  },
  methods: {
    changeStatus1() {
      this.secondList = [];
      this.form.second_cateid = "";
      // 通过first_cateid 查出二级分类
      // 查的应该是二级分类id = first-catelist id的
      this.secondList = this.catelist.find((ele) => {
        // ==
        return ele.id == this.form.first_cateid;
      });
      this.secondList = this.secondList.children;
    },
    changeStatus2() {
      this.form.goodsid = "";
      let thirdList1 = this.goodsList.find((ele) => {
        // ==
        return ele.second_cateid == this.form.second_cateid;
      });
    },
    sendData() {
      let date1 = new Date(this.mytime[0]);
      this.form.begintime = date1.getTime()+'';
      let date2 = new Date(this.mytime[1]);
      this.form.endtime = date2.getTime()+'';
      reqSeckillAdd(this.form).then((res) => {
        // 关闭当前的弹窗
        this.addBtnStatus.isShow = false;
        if (res.data.code == 200) {
          success(res.data.msg);
        } else {
          warning(res.data.msg);
        }
        this.cancle();
        // 刷新数据！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        this.reqSeckillchangeList();
      });
    },
    close() {
      this.cancle();
    },
    ...mapActions({
      reqCateListActions: "cate/reqCateListActions",
      reqGoodschangeList: "goods/reqGoodschangeList",
      reqSeckillchangeList: "seckill/reqSeckillchangeList",
    }),
    onSubmit() {},
    cancle() {
      this.addBtnStatus.isShow = false;
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.mytime=[]
    },
timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    // 这里做的是  父组件通过ref来触发我这个方法的执行
    // id 为
    getOne(id) {
      oneSeckillMessage(id).then((res) => {
        this.form = res.data.list;
        // console.log(this.timestampToTime(res.data.list.begintime*1));
        let one = this.timestampToTime(res.data.list.begintime*1)
        let two = this.timestampToTime(res.data.list.endtime*1)
        this.mytime = [new Date(one+''), new Date(two+'')]
        this.form.id = id;
      });
    },

    editall() {
      let date1 = new Date(this.mytime[0]);
      this.form.begintime = date1.getTime()+'';
      let date2 = new Date(this.mytime[1]);
      this.form.endtime = date2.getTime()+'';
      // console.log(this.form);
      menuSeckillEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancle();
        } else {
          warning(res.data.msg);
        }
        this.reqSeckillchangeList();
      });
    },
  },
  mounted() {
    this.reqCateListActions();
    this.reqGoodschangeList();
    this.reqSeckillchangeList();
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
</style>