<template>
  <div class="app-container" style="width:1250px; margin:0px auto">
    <el-row>
      <el-col :span="24">
        <el-image :src="require('@/assets/images/logo.png')"></el-image>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="line"></div>
        <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" router
          active-text-color="#ffd04b">
          <el-menu-item index="/index">商城首页</el-menu-item>
          <!-- <el-menu-item index="/introduce/1">关于我们</el-menu-item> -->
          <el-submenu index="3">
            <template slot="title">区域查看</template>
            <el-menu-item v-for="item in top_thingtype2" :key="item.id" :index="'/thing2/' + item.id">{{ item.type }}
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">分类查看</template>
            <el-menu-item v-for="item in top_thingtype" :key="item.id" :index="'/thing/' + item.id">{{ item.type }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/thing">商品搜索</el-menu-item>
             <el-menu-item index="/news">商城资讯</el-menu-item>
          <el-menu-item index="/introduce/2">联系我们</el-menu-item>
          <el-menu-item index="/buying">购物车</el-menu-item>
          <el-submenu index="client"
            v-if="this.$store.state.admin.author == null || this.$store.state.admin.author == 'client'">
            <template slot="title">会员中心</template>
            <el-menu-item v-if="this.$store.state.admin.author == 'client'" index="/client/buy/list0">会员中心
            </el-menu-item>
            <el-menu-item v-if="this.$store.state.admin.author == null" index="/web/reg">会员注册</el-menu-item>
            <el-menu-item v-if="this.$store.state.admin.author == null" index="/web/login/client">会员登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>

    </el-row>



  </div>
</template>

<script>
export default {
  data() {
    return {
      top_thingtype2: this.$store.state.config.thingtype2,
      top_thingtype: this.$store.state.config.thingtype,
      imgs: [require('@/assets/images/banner1.png'), require('@/assets/images/banner2.png'), require('@/assets/images/banner3.png')]
    }
  },
  created() {
    console.log("author:%s,token:%d", this.$store.state.admin.author, this.$store.state.admin.token)
  },
  watch: {
    $route(to, from) {
      this.$router.go(0)
    }
  },
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.tn {
  width: 100%;
  overflow: hidden;
}

.w-gk-left {
  width: 610px;
  height: 280px;

  float: left;
  margin-left: 150px;
}

.w-gk-tn {
  width: 96%;
  margin: auto;
}

.w-gk-tit {
  text-align: center;
  margin-top: 43px;
  float: left;
  width: 55px;
  font-size: 38px;
  color: #279af6;
  letter-spacing: 6px;
  font-family: cursive;
  font-weight: 900;
}

.w-gk-zy {
  margin-top: 20px;
  float: right;
  width: 509px;
  text-decoration: none;
  cursor: pointer;
  color: #333;
}

.w-sp-right {
  width: 100%;
  margin-top: .15rem;
}

swiper-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1
}

.qh1 .swiper-slide {
  font-size: 16px;
  background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.qh1 .swiper-slide a img {
  width: 910px;
  height: 590px;
}

.qh1 .swiper-slide a img {
  width: 6.4rem;
  height: 4.15rem;
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box
}

.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform
}

#ptit {
  font-size: 16px;
  font-weight: bold;
  padding: 25px 15px 3px 25px;
}

#psum {
  padding: 0px 20px 20px 20px;
  line-height: 35px;
  text-indent: 2em;
  height: 250px;
}

.w-more1 {
  /* background: url("../../../assets/images/wmj_02.png") no-repeat; */
  background-position: 75px 8px;
  width: 100px;
  float: right;
  margin-right: 25px;
}

.zs {
  bottom: .2rem !important;
}
</style>
