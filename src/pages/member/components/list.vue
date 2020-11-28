<template>
  <div>
    <template>
      <el-table
        :data="memberList"
        border
        style="width: 100%"
        :tree-props="{ children: 'children' }"
        row-key="id"
      >
      <el-table-column prop="id" label="手机号" >
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" >
        </el-table-column>
        <el-table-column prop="phone" label="手机号" >
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
            <el-button type="primary" @click="edit(scope.row.uid)"
              >编辑</el-button
            >
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
      memberList:"member/memberList"
    }),
  },
  methods: {
    ...mapActions({
      reqMemberchangeList:"member/reqMemberchangeList"
    }),

    edit(uid) {
      // 这里内容的修改
      this.mytitle.mytitle = "菜单修改";
      this.$emit("openAddBtn", uid);
    },
  },
  mounted() {
    // 自动调用仓库函数
    if (this.memberList.length === 0) {
      this.reqMemberchangeList();
    }

  },
};
</script>
<style scoped>
.imgbox{
  width: 150px;
  height: 150px;
}
</style>