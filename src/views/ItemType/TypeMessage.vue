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
          <div class="price">
           <span>价格:</span> <p>￥{{currentType.price}}元/{{cycle[currentType.si]}}</p>
          </div>
        </div>
        <div class="type-image">
          <el-image style="width: 200px; height: 200px" :src="currentType.image"></el-image>
        </div>
      </div>
      <div class="option">
        <el-button type="primary" class="modify" @click="revise">修改</el-button>
        <el-button type="primary" class="modify" @click="add">添加</el-button>
        <el-dropdown>
          <el-button type="primary">
            添加图片<i class="el-icon-arrow-up el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="addImg('002')">添加image</el-dropdown-item>
            <el-dropdown-item @click.native="addImg('101')">添加banner1</el-dropdown-item>
            <el-dropdown-item @click.native="addImg('102')">添加banner2</el-dropdown-item>
            <el-dropdown-item @click.native="addImg('103')">添加banner3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
    <el-dialog title="添加图片" center :visible.sync="imgVisible" width="900px">
      <div>
        <el-divider content-position="left">添加图片</el-divider>
        <AddImage group="006" :type="addType" :visible.sync="imgVisible" :upToDate.sync="upToDate"></AddImage>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import AddType from "@/views/Add/AddType";
import AddImage from "@/views/Add/AddImage";
export default {
  name: "TypeMessage",
  components: {AddImage, AddType},
  data() {
    return {
      /*修改Dialog是否显示*/
      reviseVisible: false,
      /*添加Dialog是否显示*/
      addVisible:false,
      imgVisible:false,
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
      addType:'',
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
      console.log(sessionStorage.getItem('uid'));
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
      console.log(res);
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
    },
    addPicture(){
      this.imgVisible=true;
      /*this.$router.push({path:'/index/addimg',query:{
        id:this.currentId
        }});*/
    },
    addImg(type){
      console.log("123");
      this.addType=type;
      this.imgVisible=true;
    },
  }
}
</script>

<style scoped lang="scss">
.type-detail {
  display: flex;
  justify-content: space-between;
  .title {
    display: flex;
    flex-direction: column;
    .price {
      display: flex;
      align-items: center;
      p{
        margin-left: 20px;
        color: red;
      }
    }
  }
}

.option {
  display: flex;
  justify-content: center;
}
</style>