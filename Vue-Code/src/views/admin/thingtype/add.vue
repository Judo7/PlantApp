<template>
<div class="app-container">
<el-form
        :model="setmes"
         style="width:50%"
        label-position="right"
        :rules="setrules"
        ref="setform"
      >
        <el-form-item label="类型名称" prop="type">
          <el-input v-model="setmes.type" />
        </el-form-item>
      </el-form>
      <div style="text-align:right; width:50%">
        <el-button type="primary" @click="sub">保存</el-button>
      </div>

  </div>
</template>

<script>
import {GetByID,Add} from "@/api/thingtype";
import { deepClone } from "@/utils";
const defaultMod={
  id:0,
  type:""
}
export default {
       data() {
        return {
          setmes: Object.assign({}, defaultMod),
          setrules: {
            type: [{ required: true, message: "请填写类型名称", trigger: "blur" }]
          },
          listQuery: {
            id:this.$route.query.id
          }
        }
      }, 
      created(){
        this.Bind();
      },
       methods:{
         
        async Bind(){
          if(this.listQuery.id!=null)
          {
            await GetByID(this.listQuery.id).then(res=>{
              this.setmes = deepClone(res.data);
            });  
          }          
        },
        async sub(){
          await Add(this.setmes).then(res=>{
            this.$message({
                message: res.msg,
                type: res.icon
              });
            if(res.success)
              this.$router.push({ name: 'admin_thingtype_list'})
          })
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
