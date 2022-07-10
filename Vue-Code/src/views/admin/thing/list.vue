<template>
<div class="app-container">
<!--  <el-table
      :data="tableData"
      style="width: 100%"> -->
       <el-table  style="width: 100%"  :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"> 
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="thingtype.type" label="物品类型"></el-table-column>
      <el-table-column prop="thingtype2.type" label="所属区域"></el-table-column>
      <el-table-column prop="intime" label="发布日期"  :formatter="dateFormat"></el-table-column>
     <el-table-column align="center" label="操作" width="350" fixed="right">
        <template slot-scope="scope">
          <router-link style=" margin-right:10px" :to="{path:'/admin/thing/add',query:{id:scope.row.id}}"><el-button type="danger" size="mini" icon="el-icon-edit">编辑</el-button></router-link>
         <el-button type="danger" size="mini" @click="Del(scope)" icon="el-icon-delete">删除</el-button>
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
import {GetList,Del} from "@/api/thing";
import moment from 'moment'
export default {
       data() {
        return {
          tableData: [],
          pageSize: 20,
          currentPage: 1,
          sum: 0,
          query:{
          }
        }
      }, 
      created(){
        this.Bind();
      },
       methods:{
        async Bind(){
            await GetList(this.query).then(list=>{
              this.tableData=list.data;
              this.sum=this.tableData.length;
            });            
        },
        async Del(obj){
            await Del(obj.row.id).then(res=>{
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
    },dateFormat:function(date){
        return moment(date).format("MM-DD")
      }
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
