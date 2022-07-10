<template>
<div class="app-container">
<el-form
        :model="setmes" style="width:800px"
        label-width="150px"
        label-position="right"
        :rules="setrules"
        ref="setform" 
      >
        <el-form-item label="资讯标题" prop="title">
          <el-input v-model="setmes.title" />
        </el-form-item>

<el-form-item label="资讯来源">
          <el-input v-model="setmes.form" />
        </el-form-item>

        <el-form-item label="封面">
          <el-upload
            name="files" :limit="max"
            :on-success="loadsuccess"
            :on-error="loaderror"
            :on-remove="loaddel"
            :action="apiload">
          <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="资讯分类" prop="newstypeId">
          <el-select v-model="setmes.newstypeId " placeholder="请选择" @change="$forceUpdate()">
            <el-option v-for="item in newstype" :key="item.id" :label="item.type" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="新闻内容">
          <div class="Tinymce_box">
          <tinymce v-model="setmes.content" :height="500" />
        </div>
        </el-form-item>
      </el-form>
      <div style="text-align:right; width:800px">
        <el-button type="primary" @click="sub">提交</el-button>
      </div>

  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

import {GetByID,Add} from "@/api/news";
import { deepClone } from "@/utils";
const defaultMod={
  id:0,
  newstypeId:0,
  title:'',
  content:'',
  form:'#',
  img: 'images/no.jpg'
}
export default {
  components: { Tinymce },
  
       data() {
        return {
          apiload:process.env.VUE_APP_BASE_API+"upload.do",
          max:1,
          newstype:[],
          setmes: Object.assign({}, defaultMod),
          setrules: {
            title: [{ required: true, message: "请填写资讯名称", trigger: "blur" }]
          },
          listQuery: {
            id:this.$route.query.id==null?0:this.$route.query.id
          }
        }
      }, 
      created(){
        this.Bind();
      },
       methods:{
         
        async Bind(){
            await GetByID(this.listQuery.id).then(res=>{
              this.newstype=res.data.newstype;
              this.setmes.newstypeId=res.data.newstype[0].id
              if(res.data.add!=null)
                this.setmes = deepClone(res.data.add);
            });          
        },
        async sub(){
          this.$refs.setform.validate(async(valid) => {
        if (valid) {
          await Add(this.setmes).then(res=>{
            
            this.$message({
                message: res.msg,
                type: res.icon
              });
            if(res.success)
              this.$router.push({ name: 'admin_news_list'})
          })
        }})
        },
        loadsuccess(response, file, fileList){
            this.setmes.files=response.data;
        },
        loaderror(err, file, fileList){
          this.$message({
                message: res.msg,
                type: res.icon
              });
        },
        loaddel(file, fileList)
        {
          this.setmes.files="";
          this.$message({
                message: "移除成功！",
                type:"success"
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