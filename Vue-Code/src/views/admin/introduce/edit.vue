<template>
<div class="app-container">
<el-form
        :model="setmes" style="width:800px"
        label-width="150px"
        label-position="right"
        ref="setform" 
      >
        <el-form-item label="类型主题">
          {{setmes.type}}
        </el-form-item>

       

        <el-form-item label="内容编辑">
          <div class="Tinymce_box">
          <tinymce v-model="setmes.content" :height="500" />
        </div>
        </el-form-item>
      </el-form>
      <div style="text-align:right; width:50%">
        <el-button type="primary" @click="sub">提交</el-button>
      </div>

  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

import {getbyid,edit} from "@/api/introduce";
import { deepClone } from "@/utils";
const defaultMod={
  id:0,
  type: '',
  content:''
}
export default {
  components: { Tinymce },
       data() {
        return {
          setmes: Object.assign({}, defaultMod)
        }
      }, 
      created(){
        this.Bind();
      },
       methods:{
         
        async Bind(){
            await getbyid(this.$route.meta.params.id).then(res=>{
                this.setmes = deepClone(res.data);
            });          
        },
        async sub(){
          this.$refs.setform.validate(async(valid) => {
        if (valid) {
          await edit(this.setmes).then(res=>{
            this.$message({
                message: res.msg,
                type: res.icon
              });
          })
        }})
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

<style lang="scss"  scoped>
.Tinymce_box {
  display: flex;
}
.editor-content {
  margin-left: 30px;
  flex-grow: 1;
  border: 2px dashed #f1f1f1;
  padding:0 20px;
}
h3 {
  color: #808080;
}
</style>