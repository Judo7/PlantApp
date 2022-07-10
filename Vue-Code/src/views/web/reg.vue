<template>
  <div class="app-container">
    <top />
    <el-main :style="loginbg">
      <div class="front">
        <el-form ref="setform" label-position="left" label-width="80px" :model="setmes" :rules="setrules">

          <div class="title-container">
            <h3 class="title">用户注册</h3>
          </div>
          <el-form-item label="用户名" prop="login">
            <el-input v-model="setmes.login"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="setmes.pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pwdtoo">
            <el-input v-model="setmes.pwdtoo" show-password></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="setmes.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="setmes.tel"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="setmes.address"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="setmes.mail"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio v-model="setmes.sex" label="男">男</el-radio>
            <el-radio v-model="setmes.sex" label="女">女</el-radio>
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
            @click.native.prevent="sub()">立即注册</el-button>


        </el-form>
      </div>
    </el-main>
    <el-footer>
      <foot />
    </el-footer>
  </div>
</template>

<script>
import top from "./components/top.vue"
import foot from "./components/foot.vue"
import { reg } from '@/api/client';
export default {
  components: {
    top, foot
  },
  data() {
    //校验邮箱的规则
    var checkEmail = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        callback(new Error('请输入有效的邮箱'));
      }
      callback();
    }

    // 验证手机号的规则
    var checkMobile = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error('请输入有效的手机号码'));
      }
      callback();
    }

    return {
      loginbg: {
        backgroundImage: 'url(' + require('@/assets/images/loginbg.png') + ')',
        width: '1200px',
        height: '800px',
        margin: '0px auto'
      },
      setrules: {
        login: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        pwd: [{ required: true, message: "请填写密码", trigger: "blur" }],
        pwdtoo: [{ required: true, message: "请填写确认密码", trigger: "blur" }],
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        tel: [{ required: true, message: "请填写电话", trigger: "blur" },
        {validator: checkMobile,
          trigger: 'blur' }],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
        mail: [{ required: true, message: "请填写邮箱", trigger: "blur" },
        {
          validator: checkEmail,
          trigger: 'blur'
        }]
      },
      setmes: {
        login: '',
        pwd: '',
        name: '',
        id: 0,
        sex: '男',
        tel: '',
        address: '',
        mail: ''
      },
      loading: false
    }
  },
  methods: {
    sub() {
      if (this.setmes.pwd != this.setmes.pwdtoo) {
        this.$message({
          message: '两次输入的密码不一至',
          type: 'error'
        })
        return false
      }
      this.$refs.setform.validate(async (valid) => {
        if (valid) {
          await reg(this.setmes).then((res) => {
            this.$alert(res.msg, '注册结果', {
              confirmButtonText: '确定',
              type: res.icon,
              callback: action => {
                if (res.success) {
                  this.$router.push({ name: "index" })
                }
              }
            });
          })
          // eslint-disable-next-line no-undef

        }
      })
    },
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

.front {
  width: 400px;
  border: solid 0px red;
  background: #fff;
  opacity: 0.9;
  border-radius: 10px;
  padding: 30px 20px;
  float: right;
  margin: 50px
}
</style>