<template>
<div class="app-container">
<!--  <el-table
      :data="tableData"
      style="width: 100%"> -->
       <el-table  style="width: 100%"  :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"> 
      <el-table-column
        prop="type"
        label="类型名称">
      </el-table-column>
     <el-table-column align="center" label="操作" width="250" fixed="right">
        <template slot-scope="scope">

          <router-link style=" margin-right:10px" :to="{path:'/admin/thingtype/add',query:{id:scope.row.id}}"><el-button type="danger" size="mini" icon="el-icon-edit">编辑</el-button></router-link>
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
import {GetList,Del} from "@/api/thingtype";
export default {
       data() {
        return {
          tableData: [],
          pageSize: 20,
          currentPage: 1,
          sum: 0,
        }
      }, 
      created(){
        this.Bind();
      },
       methods:{
         
        async Bind(){
            await GetList().then(list=>{
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
                //const index = this.tableData.findIndex(v => v.id === this.setmes.id)//获取索引,datalist就是列表集合，setmes是你单击编辑这一条数据的集合
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
