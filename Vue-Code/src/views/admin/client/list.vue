<template>
  <div class="app-container">
    <!--  <el-table
      :data="tableData"
      style="width: 100%"> -->
    <el-table style="width: 100%" :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
      <el-table-column prop="login" label="用户名">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="pwd" label="密码">
      </el-table-column>
      <el-table-column prop="sex" label="性别">
      </el-table-column>
      <el-table-column prop="tel" label="电话">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="Del(scope)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="tabListPage">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
        layout="total, prev, pager, next, jumper" :total="sum">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { GetList, Del } from "@/api/client";
export default {
  data() {
    return {
      tableData: [],
      pageSize: 20,
      currentPage: 1,
      sum: 0,
    }
  },
  created() {
    this.Bind();
  },
  methods: {
    async Del(obj) {
      await Del(obj.row.id).then(res => {
        this.$message({
          message: res.msg,
          type: res.icon
        });
        if (res.success) {
          this.tableData.splice(obj.$index, 1)
        }
      });
    },

    async Bind() {
      await GetList().then(list => {
        this.tableData = list.data;
        this.sum = this.tableData.length;
      });
    },
    handleCurrentChange(val) {
      //翻页事件
      this.currentPage = val;
      this.Bind();
    },
  }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
