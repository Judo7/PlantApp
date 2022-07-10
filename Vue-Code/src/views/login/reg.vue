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
      <el-form-item label="用户名">
        {{this.$store.state.admin.login}}
      </el-form-item>
        <el-form-item label="性别" prop="sex">
        <el-select
          v-model="setmes.sex"
          placeholder="请选择" 
          @change="$forceUpdate()"
        >
          <el-option
            v-for="item in sex"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机" prop="tel">
        <el-input v-model="setmes.tel" />
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="setmes.mail" />
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="setmes.address" />
      </el-form-item>
    </el-form>
    <div style="text-align: right; width: 50%">
      <el-button type="primary" @click="sub">提交</el-button>
    </div>
  </div>
</template>

<script>
import { edit,getbyid } from '@/api/client'
import { deepClone } from "@/utils";
const defaultMod = {
  id: 0,
  sex: '男',
  tel: '',
  address: '',
  mail:''
}
export default {
  data() {
    return {
        sex:['男','女'],
      setmes: Object.assign({}, defaultMod),
      setrules: {
        tel: [{ required: true, message: '请填写手机号参与', trigger: 'blur' }],
        address: [{ required: true, message: '请填写联系地址', trigger: 'blur' }],
        mail: [{ required: true, message: '请填写邮箱', trigger: 'blur' }]
      }
    }
  },
  created() {
      this.Bind()
  },
  methods: {
       async Bind() {
      await getbyid(this.$store.state.admin.id).then((res) => {
        this.setmes = deepClone(res.data)
      })
    },
    async sub() {
      this.$refs.setform.validate(async(valid) => {
        if (valid) {
          await edit(this.setmes).then((res) => {
            this.$message({
              message: res.msg,
              type: res.icon
            })
          })
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