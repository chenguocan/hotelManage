<template>
  <div>
    <!--返回按钮-->
    <el-button  icon="el-icon-arrow-left" circle size="small" @click="back"></el-button>
    <!--banner-->
    <el-carousel :interval="4000" type="card" height="250px">
      <el-carousel-item v-for="item in currentType.banner" :key="item">
        <el-image
            :src="item">
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <!--工位信息-->
    <el-card>
      <div class="type-detail">
        <div class="title">
          <p>{{currentType.name}}</p>
          <p v-html="currentType.content"></p>
          <p class="price">￥{{currentType.price}}元/{{cycle[currentType.si]}}</p>
        </div>
        <div class="type-image">
          <el-image style="width: 200px; height: 200px" :src="currentType.image"></el-image>
        </div>
      </div>
      <div class="option">
        <el-button type="primary" class="modify" @click="revise">修改</el-button>
        <el-button type="primary" class="modify" @click="add">添加</el-button>
      </div>
    </el-card>
    <!--修改工位信息-->
    <el-dialog title="修改信息" center :visible.sync="reviseVisible" width="900px">
      <AddType :current-type="currentType" :visible.sync="reviseVisible" :upToDate.sync="upToDate"></AddType>
    </el-dialog>
    <!--添加新工位信息-->
    <el-dialog title="添加信息" center :visible.sync="addVisible" width="900px">
      <AddType  :visible.sync="addVisible" :upToDate.sync="upToDate"></AddType>
    </el-dialog>
  </div>
</template>

<script>

import AddType from "@/views/Add/AddType";
export default {
  name: "TypeMessage",
  components: {AddType},
  data() {
    return {
      /*修改Dialog是否显示*/
      reviseVisible: false,
      /*添加Dialog是否显示*/
      addVisible:false,
      cycle:{
        1:'时',
        2:'天',
        3:'周',
        4:'月',
        5:'季',
        6:'年'
      },
      /*监听数据更新标志*/
      upToDate:0,
      /*当前工位id*/
      currentId:'',
    }
  },
  created() {
    this.currentId=this.$route.query.id;
    this.getItemType(this.currentId);
  },
  watch:{
    /*监听数据更新*/
    upToDate(){
      if(this.upToDate===1){
        this.getItemType(this.currentId);
      }
      this.upToDate=0;
    }
  },
  computed:{
    currentType(){
      return this.$store.state.itemType
    }
  },
  methods: {
    submit() {
      this.reviseVisible = false
    },
    /*获取当前id的工位信息*/
    async getItemType(id){
      let key = sessionStorage.getItem('key');
      let signStr=`id=${id}&sign=${key}`;
      let sign=this.$md5(signStr).  toUpperCase();
      const res = await this.$request.post('/console/GetItemType', {id}, {
        headers:{
          sign
        }
      })
      res.data.data.price=(res.data.data.price/100).toFixed(2);
      if(res.data.errCode!==0){
          return this.$message({
            type:'error',
            message:res.data.errMsg
          })
      }
      this.$store.commit('getType',res.data.data);
    },
    /*改变Dialog状态*/
    revise(){
      this.reviseVisible=true;
    },
    add(){
      this.addVisible=true;
    },
    /*返回*/
    back(){
      this.$router.back(-1);
    }
  }
}
</script>

<style scoped lang="scss">
.type-detail {
  display: flex;
  justify-content: space-between;
  .title {
    .price {
      color: red;
    }
  }
}

.option {
  display: flex;
  justify-content: center;
}
</style>