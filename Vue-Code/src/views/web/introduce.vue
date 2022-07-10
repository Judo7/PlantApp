<template>
  <div class="app-container">
    <top />
    <el-main style="width:1250px; margin:0px auto">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <h2>{{ this.setmes.type }}</h2>
      </el-breadcrumb>
      <el-form style="width:100%" label-position="right" ref="setform">



        <el-form-item>
          <p v-html="this.setmes.content"></p>
        </el-form-item>
      </el-form>
      <div>
        <div>百度地图</div>

        <baidu-map class="map-view" :center="markerPoint" :zoom="16">
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"
            @locationSuccess="locationSuccess"></bm-geolocation>

          <bm-marker :position="markerPoint" :dragging="true" @click="infoWindowOpen">
            <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen" style="font-size: 13px">
              北京xxxx <br /><br />
              地址：北京市
            </bm-info-window>
          </bm-marker>
        </baidu-map>
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
import { getbyid } from "@/api/introduce";

export default {
  components: {
    top, foot
  },
  data() {
    return {
      setmes: [],
      center: { lng: 0, lat: 0 },
      zoom: 3,
      markerPoint: { lng: 116.4, lat: 39.9 },
      show: false
    }
  },
  created() {
    this.Bind();
  },
  methods: {

    async Bind() {
      await getbyid(this.$route.params.id).then(res => {
        this.setmes = res.data;
      });
    }
  },
  handler({ BMap, map }) {
    console.log(BMap, map);
    this.center.lng = 116.404;
    this.center.lat = 39.915;
    this.zoom = 17;
  },

  infoWindowClose() {
    this.show = false;
  },

  infoWindowOpen() {
    this.show = true;
  },

  locationSuccess(point, AddressComponent, marker) {
    console.log("定位成功");
    console.log(point);
    console.log(AddressComponent);
    console.log(marker);
  }
  /* watch: {
      $route (to, from) {
        this.$router.go(0)
      }
    }, */
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map-view {
  width: 100%;
  height: 300px;
}

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