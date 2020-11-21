<template>
    <div>
      <h3>工位详情</h3>
      <el-row :gutter="12">
        <el-col :span="8" v-for="item in currentList" :key="item.id" >
          <el-card>
              <div class="type" @click="typeMessage(item.id)">
                <span>{{item.name}}</span>
              </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import getMd5 from "@/lib/getMd5";
export default {
  name: "ItemType",
  data(){
    return{
      currentList:[],
    }
  },
  created() {
    console.log(this.$route.query.list);
    this.currentList=this.$route.query.list;
    this.currentList=JSON.parse(this.currentList);
  },
  methods:{
    async typeMessage(id){
      console.log(id);
      let uid=sessionStorage.getItem('uid');
      let key=sessionStorage.getItem('key');
      console.log(key);
      getMd5(key,id)
      let sign=sessionStorage.getItem('sign');
      const res=await this.$request.post('/console/GetItemType',{id},{
        uid,
        sign
      })
      this.$router.push({path:"/index/message",query:{
        type:res.data.data
      }});
      console.log(res);
    }
  }
}
</script>

<style scoped>
.type{
  height: 150px;
}
</style>