<template>
  <div class="image-component">
    <div class="imgBox">
      <el-upload
          action=""
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="changeImg"
          :file-list="fileList"
          :auto-upload="false"
          accept=".jpg,.jpeg,.png,.JPG,.JPEG"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
      </el-upload>
      <el-dialog append-to-body :visible.sync="dialogVisible" width="500px">
        <img width="100%" :src="dialogImageUrl" alt/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props:["file","id","group","type"],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      upLoadFile: '',
      hideUpload: false,
      limitCount: 1,
      fileList:[],
      fileName:'',
    };
  },
  created() {
    if(this.file){
      this.fileList=this.file;
    }else{
      this.fileList=[{
        url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607601699399&di=9eb80889214e2430ede033b1488b20c1&imgtype=0&src=http%3A%2F%2Fsecretkeycrm.digifilm.com.cn%2Fupload%2F20180530%2Fe676f667c4cdfc7e074898adab2622f2.jpg"
      }]
    }
    if(this.fileList.length!==0){
      this.hideUpload=true;
    }
  },
  methods: {
    handleRemove() {
      this.fileList=[{
        url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607601699399&di=9eb80889214e2430ede033b1488b20c1&imgtype=0&src=http%3A%2F%2Fsecretkeycrm.digifilm.com.cn%2Fupload%2F20180530%2Fe676f667c4cdfc7e074898adab2622f2.jpg"
      }]
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async submitUpload() {
      console.log(this.group,this.type,this.id);
      console.log(this.upLoadFile);
      this.upLoadFile=this.upLoadFile.replace(/.*;base64,/, '')
      console.log(this.upLoadFile);
      if(this.fileList===this.file){
        this.$message.error("请勿重复上传");
      }else{
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
      }
    },
    changeImg(file, fileList) {
      this.fileList = [];
      this.fileList.push(fileList[1]);
      console.log(fileList[1]);
      console.log(this.fileList);
      this.fileName=this.fileList[0].name;
      console.log(this.fileName);
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
    },

  }
}
</script>

<style scoped>
.image-component{
  display: flex;
  flex-direction: column;
  align-items: center;
}
::v-deep .hide .el-upload--picture-card {
  display: none;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item{
  display: block;
  width: 400px;
  height: 200px;
}
::v-deep .el-upload{
  line-height: 0;
  flex-direction: column;
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
  border: 0;
}
.btn{
  background: #f4f6f9;
}
::v-deep .el-upload-list__item-status-label{
  display: none !important;
}
</style>
