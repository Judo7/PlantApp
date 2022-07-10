<template>
<div class="app-container">
      <top />
  <el-main style="width:1250px; margin:0px auto">
      <el-breadcrumb separator-class="el-icon-arrow-right"><h2>{{this.setmes.title}}</h2></el-breadcrumb>
      <el-divider></el-divider>
<el-form
        style="width:100%"
        label-position="right"
        ref="setform" 
      >

       

        <el-form-item>
            <p v-html="this.setmes.content"></p>
        </el-form-item>
      </el-form>

  </el-main>
<el-footer><foot /></el-footer>
  </div>
</template>

<script>
import top from "./components/top.vue"
import foot from "./components/foot.vue"
import {GetByID} from "@/api/news";

export default {
  components: {
            top,foot
        },
       data() {
        return {
          setmes: []
        }
      }, 
      created(){
        this.Bind();
      },
       methods:{
        async Bind(){
            console.log(this.$route.params.id)
            await GetByID(this.$route.params.id).then(res=>{
                this.setmes = res.data.add;
            });          
        }
      },
/* watch: {
    $route (to, from) {
      this.$router.go(0)
    }
  }, */ 
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