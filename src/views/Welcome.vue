<template>
  <div>
    <el-carousel :interval="4000" type="card" height="150px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-card class="about">
      <div class="image">
      </div>
    </el-card>
    <el-card>
      <div class="title">
        <h3>{{itemTypes.title}}</h3>
        <p class="sub_title">{{itemTypes.sub_title}}</p>
      </div>
      <el-tree
          :data="itemTypes.list"
          :props="tagName"
          accordion
          @node-click="typeDetail">
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import getMd5 from "@/lib/getMd5";

export default {
  name: "Welcome",
  data() {
    return {
      activeName:'first',
      itemTypes: {
        list: [],
        title: '',
        sub_title: '',
      },
      tagName:{
        children:'list',
        label:'name',
      },
    }
  },
  created() {
    this.getMenuItem();
  },
  methods: {
    async getMenuItem() {
      const res = await this.$request.post('/console/GetItemTypes');
      console.log(res.data.data);
      this.itemTypes.list = res.data.data.list;
      this.itemTypes.title = res.data.data.title;
      this.itemTypes.sub_title = res.data.data.sub_title;
      console.log(this.itemTypes);
      console.log(this.itemTypes.list);
    },
    async typeDetail(data){
      let id=data.id;
      console.log(id.length)
      if(id.length===8) {
        let uid = sessionStorage.getItem('uid');
        let key = sessionStorage.getItem('key');
        console.log(key);
        getMd5(key, id)
        let sign = sessionStorage.getItem('sign');
        const res = await this.$request.post('/console/GetItemType', {id}, {
          uid,
          sign
        })
        this.$router.push({path:'/index/message',query:{type:res.data.data}});
      }
    },
    currentType(list){
      console.log(list);
/*      this.$router.push({path:'/index/itemtype',query:{
        list:JSON.stringify(list)
      }})*/
/*      const res = await this.$request.post('/console/GetItemType',{id});
      console.log(res);*/
    }
  }
}
</script>

<style scoped lang="scss">

.about{
  margin-bottom: 10px;
  .image{
    height: 100px;
    width: 100px;
  }
}
.title{
  display: flex;
/*  height: 50px;*/
  align-items: baseline;
  .sub_title{
    font-size:12px;
    margin-left: 12px;
  }
}

</style>