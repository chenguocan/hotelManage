<template>
  <div>
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
          <p class="price">￥{{currentType.price}}元/月</p>
        </div>
        <div class="type-image">
          <el-image style="width: 200px; height: 200px" :src="currentType.image"></el-image>
        </div>
      </div>
      <div class="option">
        <el-button type="primary" class="modify" @click="reviseVisible = true">修改</el-button>
      </div>
    </el-card>
    <el-dialog title="修改信息" center :visible.sync="reviseVisible">
 <!--       <el-form :model="typeForm">
          <el-form-item label="标题">
            <el-input v-model="typeForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="子标题">
            <el-input v-model="typeForm.sub_title" placeholder="请输入子标题"></el-input>
          </el-form-item>
        </el-form>-->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TypeMessage",
  data() {
    return {
      currentType: {
        content: '',
        id: '',
        image: '',
        price: '',
        reserve: '',
        show: '',
        state: '',
        subtitle: '',
        title: '',
      },
      reviseVisible: false,
    }
  },
  created() {
    this.currentType = this.$route.query.type;
  },
  methods: {
    submit() {
      this.reviseVisible = false
    },
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