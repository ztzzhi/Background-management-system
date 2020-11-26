<template>
  <div>
    <template>
      <el-table :data="goodsList" border style="width: 100%">
        <el-table-column prop="id" label="一级分类" width="180">
        </el-table-column>
        <el-table-column prop="goodsname" label="商品编号" width="180">
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="180">
        </el-table-column>
        <el-table-column prop="market_price" label="市场价格" width="180">
        </el-table-column>

        <el-table-column label="图片" sortable width="180">
          <template slot-scope="scope">
            <div class="imgBox">
              <img :src="$Img + scope.row.img" alt="" />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="是否新品" width="180">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
            <el-button type="info" v-else>否</el-button>
          </template>
        </el-table-column>

        <el-table-column label="是否热卖" width="180">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
            <el-button type="info" v-else>否</el-button>
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="info" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="size"
        @current-change="changePage"
      >
      </el-pagination>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from "./add";
import { success, warning } from "../../../util/alert";
import { delGoodsList } from "../../../util/request";
export default {
  props: ["addBtnStatus", "mytitle"],
  components: {
    vAdd,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      specsList: "specs/specsList",
      totalCount: "goods/totalCount",
      size: "goods/size",
      currentPage: "goods/currentPage",
      goodsList: "goods/goodsList",
    }),
  },
  methods: {
    ...mapActions({
      reqSpecschangeList: "specs/reqSpecschangeList",
      reqtotalCount: "goods/reqtotalCount",
      reqChangePageActions: "goods/reqChangePageActions",
      reqGoodschangeList: "goods/reqGoodschangeList",
    }),

    // 这里当 currentPage改变时会执行这个函数
    changePage(e) {
      // 在这里调用modules中的   页码改变时执行的函数！！！！
      this.reqChangePageActions(e);
    },

    edit(id) {
      // 这里内容的修改
      this.mytitle.mytitle = "菜单修改";

      // 当点击 编辑按钮是  通知父亲  执行 openAddBtn方法 并传递了一个参数id
      this.$emit("openAddBtn", id);
      // this.addBtnStatus.isShow = true;
    },
    // 这里内容的删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delGoodsList(id).then((res) => {
            if (res.data.code == 200) {
              success(res.data.msg);
              // 删除完成后 要记得刷新一下 列表数据  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!还要请求一下总数据的条数！！！！！！！
              this.reqGoodschangeList();
              this.reqtotalCount();
            } else {
              warning(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    // 自动调用仓库函数
    if (this.specsList.length === 0) {
      this.reqSpecschangeList();
    }

    this.reqtotalCount();
    if (this.goodsList.length === 0) {
      this.reqGoodschangeList();
    }
  },
};
</script>
<style scoped>
img{
  width: 150px;
  height: 150px;
}
</style>