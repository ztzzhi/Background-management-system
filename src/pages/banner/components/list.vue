<template>
  <div>
    <template>
      <el-table
        :data="bannerList"
        border
        style="width: 100%"
        :tree-props="{ children: 'children' }"
        row-key="id"
      >
      <el-table-column prop="id" label="编号" >
        </el-table-column>
        <el-table-column prop="title" label="轮播图标题" >
        </el-table-column>
        <el-table-column prop="img" label="图片" >
          <template slot-scope="scope">
              <img :src="$Img+scope.row.img" >
          </template>
        </el-table-column>
        

        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button type="info" v-else 
              >禁用</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="info" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from "./add";
import { success, warning } from "../../../util/alert";
import { delBannerList } from "../../../util/request";
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
      bannerList:"banner/bannerList"
    }),
  },
  methods: {
    ...mapActions({
      reqBannerchangeList:"banner/reqBannerchangeList"
    }),

    edit(id) {
      // 这里内容的修改
      this.mytitle.mytitle = "菜单修改";
      this.$emit("openAddBtn", id);
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delBannerList(id).then((res) => {
            if (res.data.code == 200) {
              success(res.data.msg);
              // 删除完成后 要记得刷新一下 列表数据  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!还要请求一下总数据的条数！！！！！！！
              this.reqBannerchangeList();
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
    if (this.bannerList.length === 0) {
      this.reqBannerchangeList();
    }

  },
};
</script>
<style scoped>
.imgbox{
  width: 150px;
  height: 150px;
}
img{
  width: 150px;
  height: 150px;
}
</style>