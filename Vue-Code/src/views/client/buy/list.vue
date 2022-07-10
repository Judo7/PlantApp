<template>
  <div class="app-container">
    <!--  <el-table
      :data="tableData"
      style="width: 100%"> -->

    <el-table
      style="width: 100%"
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
    >
      <el-table-column prop="client.name" label="会员名"></el-table-column>
      <el-table-column
        prop="intime"
        label="订单日期"
        :formatter="dateFormat"
      ></el-table-column>
<el-table-column  label="状态">
          <template slot-scope="scope">
              <p v-html="scope.row.stateText"></p>
          </template>
      </el-table-column>
      <el-table-column align="center" label="查看" width="250" fixed="right">
        <template slot-scope="scope">
          <router-link
            style="margin-right: 10px"
            :to="{
              path: 'buylist',
              query: { buyId: scope.row.id },
            }"
            ><el-button type="danger" size="mini" icon="el-icon-edit"
              >订单祥情</el-button
            ></router-link
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="tabListPage">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="sum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { GetList, Del } from "@/api/buy";
import moment from 'moment'
export default {
  data() {
    return {
      tableData: [],
      pageSize: 20,
      currentPage: 1,
      sum: 0,
      btntext: '',
      tostate: 0,
      disabled:true,
      query:{
          state:this.$route.meta.params.state,
          clientId:this.$store.state.admin.token
      }
    };
  },
  created() {
    this.Bind();
  },
  methods: {
    async Bind() {
      await GetList(this.query).then((list) => {
        this.tableData = list.data;
        this.sum = this.tableData.length;
      });
    },
     async EditState(obj) {
      await Del(obj.row.id,this.tostate).then((res) => {
        this.$message({
          message: res.msg,
          type: res.icon,
        });
        if (res.success) {
          this.Bind()
        }
      });
    }, 
    handleCurrentChange(val) {
      //翻页事件
      this.currentPage = val;
      this.Bind();
    },dateFormat:function(date){
        return moment(date).format("MM-DD")
      }
  },
};
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
