<template>
  <div >
    <div>
      <ul class="bannerList">
        <li class="banner" v-for="(item,index) in banner" :key="index">
          <UpImage ref="image" :file="item.url" :id="item.id" :type="item.type" :group="item.group" :width="350" :height="150">
          </UpImage>
        </li>
      </ul>
    </div>
   <!-- 公司简介-->
    <div class="main">
      <div class="about">
        <div class="modifyDetail">
          <div class="about-title">
            <el-form label-position="right" label-width="80px" size="mini" :model="aboutForm" class="demo-form-inline">
              <el-form-item label="标题">
                <el-input v-model="aboutForm.title" placeholder="标题"></el-input>
              </el-form-item>
              <el-form-item label="子标题">
                <el-input v-model="aboutForm.sub_title" placeholder="子标题"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="modify" >修改</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="aboutImg.url">
            <UpImage :file="aboutImg.url" :width="300" :height="100"></UpImage>
          </div>

        </div>
        <div class="about-content">
          <editor :edit-data.sync="aboutContent"></editor>
        </div>
    </div>
      <div class="itemType">
        <el-card>
          <el-form size="mini" label-width="80px"  :model="titleForm" class="demo-form-inline">
            <el-form-item label="标题">
              <el-input v-model="titleForm.title"  placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="子标题">
              <el-input v-model="titleForm.sub_title" placeholder="子标题"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="modify" >修改</el-button>
            </el-form-item>
          </el-form>
          <el-tree
              :data="typeList"
              :props="tagName"
              accordion
              @node-click="typeDetail">
          </el-tree>
        </el-card>
      </div>
      </div>
     <div>
      <el-dialog
          title="工位详情"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          v-if="dialogVisible"
          style="margin-top:0;"
      >
        <ItemDetail :id="itemId"></ItemDetail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor";
import ItemDetail from "@/components/ItemDetail";
import UpImage from "@/components/UpImage";
export default {
  components: {
    UpImage,
    ItemDetail,
    Editor,
  },
  name: "AddImg",
  data() {
    return {
      banner:[],
      fileList: [],
      dialogVisible: false,
      aboutForm:{
        title:'',
        sub_title:'',
      },
      aboutContent:'',
      titleForm:{
        title:'',
        sub_title:'',
      },
      tagName: {
        children: 'list',
        label: 'name',
      },
      typeList:[],
      itemId:0,
      aboutImg:[],
    }
  },
  mounted() {
    this.getMenuItem()
    this.getAbout()
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
    },
    async getMenuItem() {
      const res = await this.$request.post('/console/GetItemTypes');
      let banner=res.data.data.banner;
      console.log(res);
      let type=100;
      this.titleForm.title=res.data.data.title;
      this.titleForm.sub_title=res.data.data.sub_title;
      this.typeList=res.data.data.list;
      console.log(this.typeList);
      banner.forEach(item=>{
        let file={url:item,id:'2',group:'001',type:`${type+=1}`}
        this.banner.push(file);
      })
      sessionStorage.setItem('types', this.itemTypes);
    },
    async getAbout() {
      let key = sessionStorage.getItem('key');
      let signStr = `sign=${key}`;
      let sign = this.$md5(signStr).toUpperCase();
      const res = await this.$request.post('/Console/GetAboutAboutMobile', {}, {
        headers: {
          sign,
        }
      })
      console.log(res);
      this.about = res.data.data;
      this.aboutForm = this.about;
      this.aboutContent=this.about.content;
      let aboutImg={url:res.data.data.image};
      this.aboutImg=aboutImg;
      console.log(this.aboutImg);
    },
    modify(){
      console.log(this.aboutContent);
    },
    typeDetail(data, node) {
      if(node.level!==1){
        this.itemId=data.id;
        this.dialogVisible=true;
      }
    },
  }
}
</script>

<style scoped>

ul, li {
  list-style: none;
}
::v-deep .el-dialog{
  min-width: 1300px;
  min-height:710px ;
  margin: 20px 0 0 100px !important;
}
.bannerList {
  display: flex;
}
.banner{
  margin:0 0 5px 65px;
}
.main{
  display: flex;
  width: 100%;
}
.about{
  width: 850px;
  padding-left: 40px;
}
.itemType{
  min-width: 300px;
  margin-left: 50px;
  height: 200px;
}
.about-content{
  display: block;
  width: 800px;
  height: 350px;
}
::v-deep .el-dialog__body{
  height: 80vh;
}
.about-title{
  margin-right: 100px;
  width: 400px;
}
.modifyDetail{
  display: flex;
}
::v-deep .el-dialog__body{
  padding: 0 0 0 125px;
}
</style>
