<template>
  <div>


    <el-button  icon="el-icon-arrow-left" circle size="small" @click="back"></el-button>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in currentType.banner" :key="item">
        <el-image
            :src="item">
        </el-image>
      </el-carousel-item>
    </el-carousel>
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
      </div>
    </el-card>
    <el-dialog title="修改信息" center :visible.sync="reviseVisible" width="800px">
      <AddType :current-type="currentType"></AddType>
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
      currentType: {},
      reviseVisible: false,
      cycle:{
        1:'时',
        2:'天',
        3:'周',
        4:'月',
        5:'季',
        6:'年'
      }
    }
  },
  created() {
    this.currentType = JSON.parse(this.$route.query.type);
    console.log(this.currentType);
    this.currentType.price=(this.currentType.price/100).toFixed(2);
  },
  methods: {
    submit() {
      this.reviseVisible = false
    },
    revise(){
      console.log(this.currentType);
      this.reviseVisible=true;
      /*this.$router.push('/index/addtype');*/
    },
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