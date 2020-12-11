<template>
  <div class="bannerImg">
    <van-uploader   v-model="fileList" :max-count="1" :after-read="afterRead"  :preview-full-image="false" >
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
      upLoadFile:'',
      fileName:'',
    }
  },
  created() {
    this.fileList=this.file
  },
  mounted(){
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      file.status = 'uploading';
      file.message = '上传中...';
      this.upLoadFile=file.content.replace(/.*;base64,/, '');
      this.fileName=file.file.name;
      let key=sessionStorage.getItem('key');
      let signStr=`id=${this.id}&imageGroup=${this.group}&imageName=${this.fileName}&imageType=${this.type}&sign=${key}`;
      let sign=this.$md5(signStr).toUpperCase();
      const res=await this.$request.post('/Console/SetImage',
          {
            id:this.id,
            imageData:this.upLoadFile,
            imageGroup:this.group,
            imageName:this.fileName,
            imageType:this.type
          },{
            headers:{
              sign
            }
          })
      if(res.data.errCode===0){
        file.status='success';
        this.$message({
          type:'success',
          message:'上传成功'
        })
      }else{
        this.$message({
          type:'error',
          message:res.data.errMsg
        })
      }
    },
  },
}
</script>

<style scoped>
.bannerImg{
  width: 350px;
  height: 150px;
}
::v-deep .van-image{
  height: 150px;
  width: 350px !important;
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
  height: 150px;
  width: 350px !important;
}
</style>
