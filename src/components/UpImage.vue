<template>
  <div :style="{width:width+'px',height:40+height+'px' }">
    <div class="img" :style="{width:width+'px',height:height+'px' } ">
      <img ref="image" :style="{width:width+'px',height:height+'px'}" :src="url" id="bannerImg" />
    </div>
    <div class="btns">
      <el-button size="mini" type="primary" @click="selector">选择
      </el-button>
      <el-button size="mini" type="success" class="submit" @click="submitPicture">上传</el-button>
    </div>
    <div ref="temp" style="width: 0;height: 0;overflow: hidden">
    </div>
  </div>
</template>

<script>
export default {
  name: "UpImage",
  props:{
    file:{
      type:String,
      default:'',
    },
    width:{
      type:Number,
      default:80,
    },
    height:{
      type:Number,
      default:80
    },
    id:{
      type:String,
      default:'',
    },
    type:{
      type:String,
      default:'',
    },
    group:{
      type:String,
      default:'',
    }
  },
  data(){
    return{
      url:'',
      currentFile:{},
      upLoadFile:'',
    }
  },
  mounted() {
    if(this.file!==''){
      this.url=this.file;
    }
  },
  methods:{
    selector(){
      let input=document.createElement('input');
      input.type='file'
      this.$refs.temp.appendChild(input);
      input.addEventListener('change',()=>{
        let file=input.files[0];
        this.currentFile=file;
        input.remove();
        if(file){
          let reader = new FileReader();
          reader.onload=(event)=>{
            let txt=event.target.result;
            this.$refs.image.src=txt;
            this.upLoadFile=txt.replace(/.*;base64,/, '');
          }
          reader.onerror=()=>{
            this.$message.error("读取文件失败");
          }
          reader.readAsDataURL(file);
        }
      })
      input.click()
    },
/*    togglePicture(){
      console.log(this.$refs.inputImage.files);
      let file=this.$refs.inputImage.files[0];
      this.currentFile=file;
      console.log(file);
      if(file){
        let reader = new FileReader();
        reader.onload=(event)=>{
          let txt=event.target.result;
          this.$refs.image.src=txt;
          this.upLoadFile=txt.replace(/.*;base64,/, '');
        }
        reader.onerror=()=>{
          this.$message.error("读取文件失败");
        }
        reader.readAsDataURL(file);
      }
    },*/

    async submitPicture(){
      let key=sessionStorage.getItem('key');
      console.log(this.id);
      console.log(this.group);
      console.log(this.type);
      if(this.id!=='' && this.group!=='' && this.type!=='' && this.upLoadFile!==''){
        let signStr=`id=${this.id}&imageGroup=${this.group}&imageName=${this.currentFile.name}&imageType=${this.type}&sign=${key}`;
        let sign=this.$md5(signStr).toUpperCase();
        const res=await this.$request.post('/Console/SetImage',
            {
              id:this.id,
              imageData:this.upLoadFile,
              imageGroup:this.group,
              imageName:this.currentFile.name,
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
      }else{
        return this.$message.error('上传条件不足,上传失败');
      }
    },
  }
}
</script>

<style scoped>
.btns{
  display: flex;
  margin: 3px 0;
  justify-content: center;
}
#bannerImg,.img{
  border-radius: 3px;
}
.btn:hover{
  cursor: pointer;
}
</style>
