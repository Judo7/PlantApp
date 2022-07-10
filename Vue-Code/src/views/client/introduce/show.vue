<template>
<div class="app-container">
<el-form
        :model="setmes" style="width:100%"
        label-position="right"
        ref="setform" 
      >
        <el-form-item>
          {{setmes.type}}
        </el-form-item>

       

        <el-form-item>
          {{setmes.content}}
        </el-form-item>
      </el-form>

      

  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

import {getbyid} from "@/api/introduce";
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