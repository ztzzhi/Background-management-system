<template>
  <div>
    <template>
      <el-table
        :data="roleList"
        border
        style="width: 100%"
        :tree-props="{ children: 'children' }"
        row-key="id"
      >
        <el-table-column prop="id" label="角色编号" width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="180">
        </el-table-column>
        

        <el-table-column label="状态" >
          <!-- 这里使用了slot-scope    
          -->
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
import {reqRoleList} from "../../../util/request"
import {delRoleList} from "../../../util/request"
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
      roleList:"role/roleList"
    }),
  },
  methods: {
    ...mapActions({
      reqRolechangeList:"role/reqRolechangeList"
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
          delRoleList(id).then((res) => {
            if (res.data.code == 200) {
              success(res.data.msg);
              this.reqRolechangeList();
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
    reqRoleList().then((res) => {
      if(res.data.list.url==undefined){
        res.data.list.url=''
      }
      this.tableData = res.data.list;
    });
    // 调用仓库函数
    if(this.roleList.length===0){
      this.reqRolechangeList();
    }

    // 自动调用仓库函数
    if (this.roleList.length === 0) {
      this.reqRolechangeList()
    };
    
    
  },
};
</script>
<style scoped>
</style>