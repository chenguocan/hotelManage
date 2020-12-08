<template>
  <div class="image-component">
    <div class="imgBox">
      <el-upload
          action=""
          list-type="picture-card"
          :class="{hide:hideUpload}"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="changeImg"
          :limit="1"
          :file-list="fileList"
          :auto-upload="false"
          accept=".jpg,.jpeg,.png,.JPG,.JPEG"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog append-to-body :visible.sync="dialogVisible" width="500px">
        <img width="100%" :src="dialogImageUrl" alt/>
      </el-dialog>
    </div>
    <el-button class="submit" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传
    </el-button>
  </div>
</template>

<script>
export default {
  props:["file"],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      upLoadFile: '',
      hideUpload: false,
      limitCount: 1,
      fileList:[],
    };
  },
  created() {
    this.fileList=this.file;
    if(this.fileList.length!==0){
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
      console.log(this.upLoadFile);
      if(this.fileList===this.file){
        this.$message.error("请勿重复上传");
      }
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
.image-component{
  display: flex;
  flex-direction: column;
  align-items: center;
}
::v-deep .el-upload--picture-card {
  margin-bottom: 15px;
}

::v-deep .hide .el-upload--picture-card {
  display: none;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item{
  width: 300px;
  height: 200px;
}
::v-deep .el-upload{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 125px;
  width: 200px;
}
</style>