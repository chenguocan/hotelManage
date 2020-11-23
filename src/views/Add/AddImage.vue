<template>
  <div class="picture">
    <div class="upload">
      <el-upload
          ref="upload"
          :class="{uoloadSty:showBtnImg,disUoloadSty:noneBtnImg}"
          :auto-upload="false"
          :file-list="diaLogForm.imgBroadcastList"
          list-type="picture-card"
          :on-change="imgBroadcastChange"
          :on-remove="imgBroadcastRemove"
          accept="image/jpg,image/png,image/jpeg"
          :limit="1"
          action=""
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-button type="success" class="btn" @click="submitDialogData">上传</el-button>
      <div slot="tip" class="el-upload__tip" v-if="type==='002'">上传232*172的图片效果更佳</div>
      <div slot="tip" class="el-upload__tip" v-else>上传750*402的图片效果更佳</div>
    </div>
  </div>
</template>

<script>
import { uploadImgToBase64 } from '@/lib/utils' // 导入本地图片转base64的方法

export default {
  name: 'AddImage',
  props:['id','group','type'],
  data () {
    return {
      diaLogForm: {
        imgBroadcastList:[], // 储存选中的图片列表
        imgsStr:''   // 后端需要的多张图base64字符串 , 分割
      },
      showBtnImg:true,
      noneBtnImg:false,
      limitCountImg:1,
      currentId:'',
      currentType:'',
      currentGroup:'',
    }
  },
  watch:{
    type(){
      this.currentType=this.type;
    },
    id(){
      console.log(this.id);
      this.currentId=this.id;
    },
    group(){
      this.currentGroup=this.group;
    }
  },
  methods: {
    // 图片选择后 保存在 diaLogForm.imgBroadcastList 对象中
    imgBroadcastChange (file, fileList) {
      console.log(file);
      const isLt2M = file.size / 1024 / 1024 < 2 // 上传头像图片大小不能超过 2MB
      if (!isLt2M) {
        this.diaLogForm.imgBroadcastList = fileList.filter(v => v.uid !== file.uid)
        this.$message.error('图片选择失败，每张图片大小不能超过 2MB,请重新选择!')
      } else {
        this.diaLogForm.imgBroadcastList.push(file)
      }
      this.noneBtnImg = fileList.length >= this.limitCountImg;
    },
    // 有图片移除后 触发
    imgBroadcastRemove (file, fileList) {
      this.noneBtnImg = fileList.length >= this.limitCountImg;
      this.diaLogForm.imgBroadcastList = fileList
    },
    // 提交弹窗数据
    async submitDialogData () {
      const imgBroadcastListBase64 = []
      console.log('图片转base64开始...')
      // 并发 转码轮播图片list => base64
      console.log(this.id);
      const filePromises = this.diaLogForm.imgBroadcastList.map(async file => {
        const response = await uploadImgToBase64(file.raw)
        return response.result.replace(/.*;base64,/, '') // 去掉data:image/jpeg;base64,
      })
      // 按次序输出 base64图片
      for (const textPromise of filePromises) {
        imgBroadcastListBase64.push(await textPromise)
      }
      console.log('图片转base64结束..., ', imgBroadcastListBase64)
      this.diaLogForm.imgsStr = imgBroadcastListBase64.join()
      console.log(this.diaLogForm);
      console.log(this.type);
      let key=sessionStorage.getItem('key');
      let signStr=`id=${this.id}&imageGroup=${this.group}&imageName=${this.diaLogForm.imgBroadcastList[0].name}&imageType=${this.type}&sign=${key}`;
      console.log(signStr);
      let sign=this.$md5(signStr).toUpperCase();
      console.log(sign);
      const res=await this.$request.post('/Console/SetImage',
          {
            id:this.id,
            imageData:this.diaLogForm.imgsStr,
            imageGroup:this.group,
            imageName:this.diaLogForm.imgBroadcastList[0].name,
            imageType:this.type
          },{
        headers:{
          sign
        }
      })
      if(res.data.errCode===0){
        this.$message({
          type:'success',
          message:res.data.errMsg
        })
        this.$emit('update:upToDate',1);
      }else{
        this.$message({
          type:'error',
          message:res.data.errMsg
        })
      }
      console.log(res);
      this.$refs.upload.clearFiles()
      this.diaLogForm.imgBroadcastList=[]
    },
    back(){
      this.$router.back(-1);
    }
  }
}
</script>
<style scoped lang="scss">
/*::v-deep .el-upload--picture-card{
  width: 232px;
  height: 172px;
  display: flex;
  align-items: center;
  justify-content: center;
}*/
.picture{
  margin-right: -10px;
}

::v-deep .el-upload{
  width: 100px;
  height: 100px;
  line-height: 100px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item{
  width: 232px;
  height: 172px;
  line-height: 100px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item-thumbnail{
  width: 232px;
  height: 172px;
  line-height: 100px;
}
::v-deep .avatar{
  width: 100px;
  height: 100px;
}
.btn{
  position:absolute;
  right: 0;
  transform: translateY(-50px);
}
.uoloadSty .el-upload--picture-card{
  width:110px;
  height:110px;
  line-height:110px;
}
.disUoloadSty .el-upload--picture-card{
  display:none;   /* 上传按钮隐藏 */
}
</style>