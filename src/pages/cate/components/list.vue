<template>
  <div>
    <template>
      <el-table
        :data="catelist"
        border
        style="width: 100%"
        :tree-props="{ children: 'children' }"
        row-key="id"
      >
        <el-table-column prop="id" label="菜单编号" width="180">
        </el-table-column>
        <el-table-column prop="catename" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="img" label="图片">
          <template slot-scope="scope">
            <!-- v-if="scope.row.img"  与  cate.js中的 代码解决无图片的bug -->
            <img :src="$Img+scope.row.img" alt="" class="imgbox" v-if="scope.row.img">
          </template>
        </el-table-column>
        
        <el-table-column label="状态" width="180">
          <!-- 这里使用了slot-scope    
          -->
          <template slot-scope="scope">
            <!-- scope.row.status==2的时候 应该为禁用状态 点击禁用状态打开 -->
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
        <el-table-column label="操作" width="180">
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
import { delCateList } from "../../../util/request";
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
      catelist:"cate/catelist"
    }),
  },
  methods: {
    ...mapActions({
      reqCateListActions:"cate/reqCateListActions"
    }),

    edit(uid) {
      // 这里内容的修改
      this.mytitle.mytitle = "菜单修改";

      // 当点击 编辑按钮是  通知父亲  执行 openAddBtn方法 并传递了一个参数id
      this.$emit("openAddBtn", uid);
      // this.addBtnStatus.isShow = true;
    },
    // 这里内容的删除
    del(uid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delCateList(uid).then((res) => {
            if (res.data.code == 200) {
              success(res.data.msg);
              // 删除完成后 要记得刷新一下 列表数据  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!还要请求一下总数据的条数！！！！！！！
              this.reqCateListActions();
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
    if (this.catelist.length === 0) {
      this.reqCateListActions();
    }
    console.log(this.catelist);
  },
};
</script>
<style scoped>
.imgbox{
  width: 150px;
  height: 150px;
}
</style>