<template>
  <div class="app-container">
    <el-table
      style="width: 100%"
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
      <el-table-column  label="商品">
          <template slot-scope="scope">
          <el-image
      style="width: 100px; height: 100px"
      :src="url+scope.row.thing.img"
      fit="contain"></el-image>
          </template>
      </el-table-column>
      <el-table-column
        prop="thing.name"
        label="商品名称"
      ></el-table-column>
      <el-table-column prop="thing.thingtype.type" label="类型"></el-table-column>
      <el-table-column prop="thing.thingtype2.type" label="区域"></el-table-column>
      <el-table-column prop="thing.price" label="价格"></el-table-column>
      
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
import { GetList, Del } from "@/api/buylist";
export default {
  data() {
    return {
      url:process.env.VUE_APP_BASE_API,
      tableData: [],
      pageSize: 20,
      currentPage: 1,
      sum: 0,
      keydata:{
        buyId:this.$route.query.buyId
      }
    };
  },
  created() {
    this.Bind();
  },
  methods: {
    async Bind() {
      await GetList(this.keydata).then((list) => {
        this.tableData = list.data.buylist;
        this.sum = this.tableData.length;
      });
    },
    handleCurrentChange(val) {
      //翻页事件
      this.currentPage = val;
      this.Bind();
    },
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
