<template>
  <div>
    <el-upload
        class="upload-demo"
        drag
        action=""
        :class="{hide:hideUpload}"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-change="changeImg"
        :limit="1"
        :file-list="fileList"
        :auto-upload="false"
        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
       >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "cropImage",
  data() {
    return {
      /*      file:{
              url:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            },*/
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
      dialogImageUrl: '',
      dialogVisible: false,
      upLoadFile: '',
      hideUpload: false,
      limitCount: 1,
    };
  },
  created() {
    if(this.fileList){
      this.hideUpload=true;
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(fileList);
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitUpload() {
      console.log(this.fileList);
    },
    changeImg(file, fileList) {
      console.log(fileList);
      this.hideUpload = fileList.length >= this.limitCount;
      this.fileList=fileList;
      this.getBase64(file.raw).then(res => {
        this.upLoadFile = res
      }).catch(() => {
        this.$message.error("上传失败");
      });
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    }
  }
}
</script>

<style scoped>

</style>