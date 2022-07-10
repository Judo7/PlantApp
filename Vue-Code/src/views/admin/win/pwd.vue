<template>
  <div class="app-container">
    <el-form
      :model="setmes"
      style="width: 600px"
      label-width="150px"
      label-position="right"
      :rules="setrules"
      ref="setform"
    >
      <el-form-item label="原始密码" prop="oldpwd">
        <el-input v-model="setmes.oldpwd" />
      </el-form-item>
        <el-form-item label="新密码" prop="pwd">
        <el-input v-model="setmes.pwd" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="newtoo">
        <el-input v-model="setmes.newtoo" />
      </el-form-item>
    </el-form>
    <div style="text-align: right; width: 50%">
      <el-button type="primary" @click="sub">提交</el-button>
    </div>
  </div>
</template>

<script>
import { pwd } from '@/api/admin'
const defaultMod = {
  id: 0,
  oldpwd: '',
  pwd: '',
  newtoo: ''
}
export default {
  data() {
    return {
      project: [],
      disabled: false,
      apiload: process.env.VUE_APP_BASE_API + 'upload.do',
      max: 1,
      setmes: Object.assign({}, defaultMod),
      setrules: {
        oldpwd: [{ required: true, message: '请填写原始密码', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
      }
    }
  },
  created() {
      this.setmes.id=this.$store.state.admin.id
  },
  methods: {
    async sub() {
      // eslint-disable-next-line eqeqeq
      if (this.setmes.oldpwd != this.$store.state.admin.pwd) {
        this.$message({
          message: '原始密码输入有误',
          type: 'error'
        })
        return false
      }
      // eslint-disable-next-line eqeqeq
      if (this.setmes.pwd != this.setmes.newtoo) {
        this.$message({
          message: '两次输入的密码不一至',
          type: 'error'
        })
        return false
      }
      this.$refs.setform.validate(async(valid) => {
        if (valid) {
          await pwd(this.setmes).then((res) => {
            this.$alert(res.msg, '修改结果', {
                confirmButtonText: '确定',
                type: res.icon,
                callback: action => {
                    if (res.success) {
                    this.$store.dispatch('admin/resetToken')
                    this.$router.push('/login')
            }
                }
            });
          })
          // eslint-disable-next-line no-undef
          
        }
      })
    }
  }
}
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

<style lang="scss"  scoped>
.Tinymce_box {
  display: flex;
}
.editor-content {
  margin-left: 30px;
  flex-grow: 1;
  border: 2px dashed #f1f1f1;
  padding: 0 20px;
}
h3 {
  color: #808080;
}
</style>