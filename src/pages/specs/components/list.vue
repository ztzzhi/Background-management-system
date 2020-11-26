<template>
  <div>
    <template>
      <el-table :data="specsList" border style="width: 100%">
        <el-table-column prop="id" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="specsname" label="用户名" width="180">
        </el-table-column>

        <el-table-column prop="attrs" label="规格属性" width="400">
          <template slot-scope="scope">
            <el-tag type="warning" v-for="item in scope.row.attrs" :key="item.id">{{item}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <!-- 这里使用了slot-scope    
          -->
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
import { delSpecsList } from "../../../util/request";
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
      totalCount: "specs/totalCount",
      size: "specs/size",
      currentPage: "specs/currentPage",
    }),
  },
  methods: {
    ...mapActions({
      reqSpecschangeList: "specs/reqSpecschangeList",
      reqtotalCount: "specs/reqtotalCount",
      reqChangePageActions: "specs/reqChangePageActions",
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
          delSpecsList(id).then((res) => {
            if (res.data.code == 200) {
              success(res.data.msg);
              // 删除完成后 要记得刷新一下 列表数据  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!还要请求一下总数据的条数！！！！！！！
              this.reqSpecschangeList();
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
  },
};
</script>
<style scoped>
</style>