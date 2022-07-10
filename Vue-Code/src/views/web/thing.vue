<template>
  <el-container>
  <top />
  <el-main style="width:1250px; margin:0px auto">


     <div>
          <div slot="title">
      <h2 v-if="query.thingtypeId==null && query.thingtype2Id==null">产品搜索:   
       <el-input style="width:500px;" placeholder="请输入商品名称" v-model="query.name" clearable>
   
    <el-button slot="append" icon="el-icon-search" @click="Bind"></el-button>
  </el-input>
      </h2>
    </div>
    <div slot="title">
      <h2>产品列表</h2>
    </div>
     <el-row :gutter="20">
                <el-col :span="4" v-for="item in list"  v-bind:key="item.id">
                    <div style="border:solid 1px #DCDCDC; padding:5px">
                        <router-link :to="{name:'thingshow',params:{id:item.id}}">
                            <el-image  :src="url+item.img" fit="cover" style="height:130px; width:100%;" ></el-image>
                        </router-link>
                    </div>
                    <p style="display:block; text-align:center">{{item.name}}</p>
                    
                </el-col>
            </el-row>
     </div>

    
  </el-main>
  <el-footer><foot /></el-footer>
</el-container>
</template>

<script>
    import top from "./components/top.vue"
    import foot from "./components/foot.vue"
    import {GetList} from "@/api/thing";
    export default{
        components: {
            top,foot
        },
        data(){
            return{
                url:process.env.VUE_APP_BASE_API,
                list:[],
                query:{
                    "name":'',
                    thingtypeId:this.$route.params.thingtypeId,
                    thingtype2Id:this.$route.params.thingtype2Id
                }
            }
        },
        created(){
            this.Bind()
        },
        methods:{
            async Bind(){
                await GetList(this.query).then(res=>{
                    this.list=res.data;
                })
            }
        }
    }
</script>
