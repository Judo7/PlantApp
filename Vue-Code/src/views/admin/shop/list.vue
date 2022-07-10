<template>
<div class="app-container">
<!--  <el-table
      :data="tableData"
      style="width: 100%"> -->
       <el-table  style="width: 100%"  :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"> 
      <el-table-column
        prop="login"
        label="工号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pwd"
        label="加盟商"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="state(scope)"  v-if="scope.row.state==0">审核</el-button>
          </template>
      </el-table-column>
    </el-table>

<div class="tabListPage">
           <el-pagination 
                          @current-change="handleCurrentChange" 
                          :current-page="currentPage" 
                          :page-size="pageSize" layout="total, prev, pager, next, jumper" 
                          :total="sum">
             </el-pagination>
       </div>

  </div>
</template>

<script>
import {GetList,State} from "@/api/shop";
export default {
       data() {
        return {
          tableData: [],
          pageSize: 20,
          currentPage: 1,
          sum: 0,
          keydata:{
            state:this.$route.meta.params.state
          },
          query:{
            state:0,
            id:0
          }
        }
      }, 
      created(){
        this.Bind();
      },
       methods:{
         
        async Bind(){
          console.log(JSON.stringify(this.$route.meta.params.state))
            await GetList(this.keydata).then(list=>{
              this.tableData=list.data;
              this.sum=this.tableData.length;
            });            
        },state(obj){
            this.$confirm('请选择对加盟商家的审核结果?', '提示', {
            confirmButtonText: '通过',
            cancelButtonText: '拒绝',
            type: 'warning'
          }).then(() => {
            this.query.state=1;
            this.query.id=obj.row.id
            this.EditState(obj);
          }).catch(() => {
            this.query.state=2;
            this.query.id=obj.row.id
            this.EditState(obj);         
          }); 
        },async EditState(obj){
          await State(this.query).then(res=>{
              this.$message({
                message: res.msg,
                type: res.icon
              });
              if(res.success)
              {
                this.tableData.splice(obj.$index,1)
              }
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
h1, h2 {
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
