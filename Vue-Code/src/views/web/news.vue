<template>
  <el-container>
  <top />
  <el-main style="width:1250px; margin:0px auto">


     <div>
    <div slot="title">
      <h2>资讯列表</h2>
    </div>
    <el-divider></el-divider>
     <el-row :gutter="20" v-for="item in tabledata"  v-bind:key="item.id">
            <el-col :span="20" >
                    <router-link :to="{name:'newsshow',params:{id:item.id}}">{{item.title}}</router-link>
                </el-col>
                <el-col :span="4" >
                    {{item.intime|dateFormat}}
                </el-col>
                <el-divider></el-divider>
            </el-row>
     </div>

    
  </el-main>
  <el-footer><foot /></el-footer>
</el-container>
</template>

<script>
    import top from "./components/top.vue"
    import foot from "./components/foot.vue"
    import {GetList} from "@/api/news";
    import moment from 'moment'
    export default{
        components: {
            top,foot
        },
        data(){
            return{
                tabledata:[]
            }
        },
        created(){
            this.Bind()
        },
        methods:{
            async Bind(){
                await GetList().then(res=>{
                    this.tabledata=res.data;
                })
            },
        },filters:{
      dateFormat:function(date){
        return moment(date).format("MM-DD")
      }
        }
    }
</script>