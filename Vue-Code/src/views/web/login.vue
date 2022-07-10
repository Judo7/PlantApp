<template>
<div class="app-container">
      <top />
  <el-main :style="loginbg"  >
     <div class="front">
     <el-form ref="setform" label-position="left" label-width="80px" :model="setmes" :rules="setrules" >

      <el-form-item label="用户名" prop="login">
       <el-input v-model="setmes.login"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
       <el-input v-model="setmes.pwd" show-password></el-input>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">立即登录</el-button>


    </el-form>
     </div>
  </el-main>
<el-footer><foot /></el-footer>
  </div>
</template>

<script>
import top from "./components/top.vue"
import foot from "./components/foot.vue"
import { clientmenu } from '@/router/clientrouter';
export default {
  components: {
            top,foot
        },
       data() {
        return {
          setmes:{
            login:'',
            pwd:'',
            author:'client'
          },
          loginbg:{ 
            backgroundImage:'url('+require('@/assets/images/loginbg.png')+')',
            width:'1200px',
            height:'800px',
            margin:'0px auto'
          },
          setrules: {
            login: [{ required: true, message: "请填写用户名", trigger: "blur" }],
            pwd: [{ required: true, message: "请填写密码", trigger: "blur" }]
          },
          show:false,
          loading: false
        }
      }, 
      watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },created(){
    
  },
  methods: {
    handleLogin() {
      this.$refs.setform.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('admin/loginin', this.setmes).then(res => {

        switch (this.$store.state.admin.author) {
            case 'client':
                this.$router.options.routes = clientmenu// 配置管理员路由
                this.$router.addRoutes(clientmenu)// 动态加载路由
              break
            default:
              break
          }
          console.log('/'+this.$store.state.admin.author+'/buy/list0')
          this.$router.push({path:'/'+this.$store.state.admin.author+'/buy/list0'})
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
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
 
.front{
    width:400px; border:solid 0px red; background:#fff; opacity: 0.9; border-radius: 10px; padding:30px 20px; float:right; margin:50px
}
</style>