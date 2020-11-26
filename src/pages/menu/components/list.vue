<template>
  <div>
    <template>
      <el-table
        :data="list"
        border
        style="width: 100%"
        :tree-props="{ children: 'children' }"
        row-key="id"
      >
        <el-table-column prop="id" label="菜单编号" width="180">
        </el-table-column>
        <el-table-column prop="title" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="icon" label="菜单图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="菜单地址" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.url }}</span>
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
import { reqMenuList } from "../../../util/request";
import vAdd from "./add";
import { delList } from "../../../util/request";
import { success, warning } from "../../../util/alert";

export default {
  props: ["addBtnStatus","mytitle"],
  components: {
    vAdd,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqchangeList: "menu/reqchangeList",
    }),
    open(id) {
      // 这个是开启状态status的控制
    },
    noOpen(id) {
      // 这里做状态的修改  如果当前为开启状态 点击后 变成关闭状态
    },
    // 这里要通知 父组件 
    edit(id) {
      // 这里内容的修改
      this.mytitle.mytitle = "菜单修改"

      // 当点击 编辑按钮是  通知父亲  执行 openAddBtn方法 并传递了一个参数id
      this.$emit("openAddBtn",id)
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
          delList(id).then((res) => {
            if (res.data.code == 200) {
              success(res.data.msg);
              this.reqchangeList();
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

      // 删除完成后 要记得刷新一下 列表数据
    },
  },
  mounted() {
    reqMenuList().then((res) => {
      // console.log("我是请求的列表所有数据");
      // console.log(res);
      if(res.data.list.url==undefined){
        res.data.list.url=''
      }
      this.tableData = res.data.list;
      // console.log(this.tableData);
    });
    // 调用仓库函数
    if(this.list.length===0){
      this.reqchangeList();
    }

  },
};
</script>
<style scoped>
</style>