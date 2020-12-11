<template>
  <div class="bannerImg">
    <van-uploader  ref="item"  v-model="fileList" :max-count="1" :after-read="afterRead" :preview-full-image="false" >
    </van-uploader>
  </div>
</template>

<script>

export default {
  name: "UpImage",
  props:["file","id","group","type"],
  data(){
    return{
      fileList:[],
    }
  },
  created() {
    if(this.file){
      this.fileList=this.file
    }else{
      this.fileList=[{url:''}]
    }
  },
  mounted(){

  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    xxx(){
      console.log("123123");
      setTimeout(() => {
        this.$refs.item.chooseFile();
      }, 0);
    }
  },
}
</script>

<style scoped>
.bannerImg{
  height: 125px;
  width: 300px;
}
::v-deep .van-image{
  height: 125px;
  width: 300px !important;
  border-radius: 3px;
}
::v-deep .van-uploader__wrapper,::v-deep  .van-uploader__upload {
  width: 100%;
  height: 100%;
  margin: 0;
  background: #ececec;
  border-radius: 3px;
}
::v-deep .van-uploader{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 125px;
  width: 300px !important;
}
</style>
