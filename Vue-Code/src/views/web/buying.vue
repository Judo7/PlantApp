<template>
  <div class="app-container">
    <top />
    <el-main style="width:1250px; margin:0px auto">

      <el-table style="width: 100%" :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
        <el-table-column label="商品">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="url + scope.row.thing.img" fit="contain" />
          </template>
        </el-table-column>
        <el-table-column prop="thing.name" label="商品名称" />
        <el-table-column prop="thing.thingtype.type" label="类型" />
        <el-table-column prop="thing.thingtype2.type" label="区域" />
        <el-table-column prop="thing.price" label="价格" />
        <el-table-column prop="thing.num" label="数量" />

        <el-table-column align="center" label="操作" width="350" fixed="right">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.thing.num" @change="handleChange(scope)"></el-input-number>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="Del(scope)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>

      <div class="tabListPage">
        <el-pagination :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
          :total="sum" @current-change="handleCurrentChange" />
      </div>
      <el-button type="danger" disabled>总金额{{ this.summoney }}元</el-button>
      <el-button type="primary" icon="el-icon-shopping-cart-full" @click="buy()">支付</el-button>

     

    </el-main>
    <el-footer>
      <foot />
    </el-footer>
  </div>
</template>

<script>
import { GetList, Del } from '@/api/buying'
import top from './components/top.vue'
import foot from './components/foot.vue'
import { Add, AddCart, Pay } from '@/api/buy'
export default {
  components: {
    top, foot
  },
  data() {
    return {
      url: process.env.VUE_APP_BASE_API,
      tableData: [],
      pageSize: 20,
      currentPage: 1,
      sum: 0,
      query: {
        clientId: this.$store.state.admin.token
      },
      summoney: 0,
      addBuy: {
        num: 0,
        id: ''
      },
      payData: {
        orderId: '',
        payMoney: 0
      }
    }
  },
  created() {
    this.Bind()
  },
  methods: {

    handleChange(obj) {
      this.addBuy.id = obj.row.thing.id
      this.addBuy.num = obj.row.thing.num
      console.log(this.addBuy)
      this.addCar()


    },
    async addCar() {

      if (this.$store.state.admin.token == null) {
        this.$message({
          message: '请先登陆',
          type: 'warning'
        })
        return false
      }

      await AddCart(this.addBuy).then(res => {
        this.Bind()
      })
    },
    async Bind() {
      await GetList(this.query).then((list) => {
        this.tableData = list.data.buying

        this.sum = this.tableData.length
        this.summoney = list.data.sum
      })
    },
    async buy() {
      await Add(this.query).then(res => {
        console.log(res)

        if (res.msg == '下单成功') {
         this.payData.payMoney=this.summoney
         Pay(this.payData).then(payRes=>{
           console.log(payRes)
           // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
        const divForm = document.getElementsByTagName("div");
        if (divForm.length) {
          document.body.removeChild(divForm[0]);
        }
        const div = document.createElement("div");
        div.innerHTML = payRes.msg; // data就是接口返回的form 表单字符串
        document.body.appendChild(div);
        document.forms[0].setAttribute("target", "_blank"); // 新开窗口跳转
        document.forms[0].submit();

         })

        }
      })
    },
    async Del(obj) {
      await Del(obj.row.id).then(res => {
        this.$message({
          message: res.msg,
          type: res.icon
        })
        if (res.success) {
          this.tableData.splice(obj.$index, 1)
        }
      })
    },
    handleCurrentChange(val) {
      // 翻页事件
      this.currentPage = val
      this.Bind()
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
