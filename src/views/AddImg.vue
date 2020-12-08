<template>
  <div >
    <ul class="foodList">
      <li class="food" v-for="(item,index) in data" :key="index">
        <img class="food" :src="item"/>
        <el-button class="edit" icon="el-icon-edit" size="mini" circle @click="edit(item)"></el-button>
      </li>
    </ul>
    <div>
      <el-dialog
          title="图片操作"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          v-if="dialogVisible"
          class="imageDialog"
      >
        <up-load-image :file="fileList"></up-load-image>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import upLoadImage from "@/components/upLoadImage";

export default {
  components: {
    upLoadImage,
  },
  name: "AddImg",
  data() {
    return {
      data: [
        "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1607408544&di=c71fa80ca2091b80a81678cf8de885fd&src=http://a4.att.hudong.com/25/99/19300000421423134190997943822.jpg",
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      ],
      fileList: [],
      dialogVisible: false,
    }
  },
  methods: {
    edit(item) {
      this.fileList = [];
      let file = {url: item};
      this.fileList.push(file);
      this.dialogVisible=true;
    },
    handleClose() {
      this.dialogVisible=false
    }
  }
}
</script>

<style scoped>

ul, li {
  list-style: none;
}

.foodList {
  display: flex;
}

.food {
  width: 200px;
  height: 125px;
  position: relative;
}

.edit {
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0.5;
}

.edit:hover {
  opacity: 1;
}
</style>