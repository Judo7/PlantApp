<template>
  <el-container>
    <top />
    <el-main style="width:1250px; margin:0px auto">

      <div>
        <div slot="title">
          <h2>{{ thing.name }}</h2>
        </div>
        <el-divider />
        
        <el-row :gutter="20" :span="24">
          <el-col :span="24">
            <el-divider content-position="left"><p style="font-size:16px">商品介绍</p></el-divider>
            <p v-html="thing.content" />
          </el-col>
        </el-row>
        <el-row :gutter="20" :span="24">
          <el-col :span="8"><el-image :src="url+thing.img" fit="fill" style="width:100%;" /></el-col>
          <el-col :span="16">
            <el-row :gutter="10" :span="24">
              <el-col :span="24"><h2>{{ thing.name }}</h2><el-divider /></el-col>
              <el-col :span="24">商品类型：{{ thing.thingtype.type }}<el-divider /></el-col>
              <el-col :span="24">适用人群：{{ thing.thingtype2.type }}<el-divider /></el-col>
              <el-col :span="24">参考价格：{{ thing.price }}元<el-divider /></el-col>
              <el-col :span="24"><el-button type="primary" icon="el-icon-shopping-cart-full" @click="buy()">加入购物车</el-button></el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

    </el-main>
    <el-footer><foot /></el-footer>
  </el-container>
</template>

<script>
import top from './components/top.vue'
import foot from './components/foot.vue'
import { GetByID } from '@/api/thing'
import { Add } from '@/api/buying'
export default {
  components: {
    top, foot
  },
  data() {
    return {
      url: process.env.VUE_APP_BASE_API,
      thing: [],
      id: this.$route.params.id,
      query: {
        thingId: this.$route.params.id,
        clientId: this.$store.state.admin.token
      }
    }
  },
  created() {
    this.Bind()
  },
  methods: {
    async Bind() {
      await GetByID(this.id).then(res => {
        this.thing = res.data.add
      })
    },
    async buy() {
      if (this.$store.state.admin.token == null) {
        this.$message({
          message: '请先登陆',
          type: 'warning'
        })
        return false
      }
      await Add(this.query).then(res => {
        this.$alert(res.msg, '操作提示：', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/buying')
          }
        })
      })
    }
  }
}
</script>
