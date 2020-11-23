<template>
  <div class="index">
    <!--banner-->
    <div class="banner">
      <swiper ref="bannerSwiper" :options="swiperOptions">
        <swiper-slide v-for="(item,index) in banner" :key="index">
          <img :src="item" style="height: 180px;width: 400px"/>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <el-button icon="el-icon-edit" circle class="btn" size="small" @click="updateBanner"></el-button>
    </div>
    <!--    <el-row :gutter="16" style="margin-top:10px ">
          <el-col :span="20">
            <el-card class="about">
              <div class="image" style="width: 100%">
                <div class="title" style="width: 100%;display: flex;justify-content: space-between;">
                  <div class="titleDetail">
                    <h3>{{about.title}}</h3>
                <p class="sub_title">{{about.subTitle}}</p>
              </div>
              <div class="btn">
                <el-button size="small" icon="el-icon-edit" circle @click="aboutVisible=true"></el-button>
              </div>
            </div>
          </div>
          <div v-html="about.content" class="content"></div>
        </el-card>
      </el-col>
      &lt;!&ndash; 公司简介&ndash;&gt;
      <el-col  style="width: 300px">
        <el-card>
          <div class="title">
            <div class="titleDetail">
              <h3>{{itemTypes.title}}</h3>
              <p class="sub_title">{{itemTypes.sub_title}}</p>
            </div>
            <div class="btn">
              <el-button size="small" icon="el-icon-edit" circle @click="edit"></el-button>
            </div>
          </div>
          &lt;!&ndash;工位展示&ndash;&gt;
          <el-tree
              :data="itemTypes.list"
              :props="tagName"
              accordion
              :load="loadNode"
              @node-click="typeDetail">
          </el-tree>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog  title="修改标题" center :visible.sync="editVisible">
      <el-form  :model="titleForm">
        <el-form-item label="标题">
          <el-input v-model="titleForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="子标题">
          <el-input v-model="titleForm.sub_title" placeholder="请输入子标题"></el-input>
        </el-form-item>
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </el-form>
    </el-dialog>

    <el-dialog  title="修改公司简介" center :visible.sync="aboutVisible">
      <el-form  :model="aboutForm">
        <el-form-item label="标题">
          <el-input v-model="aboutForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="子标题">
          <el-input v-model="aboutForm.subTitle" placeholder="请输入子标题"></el-input>
        </el-form-item>
        <Editor :editData.sync="editData"></Editor>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="aboutVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitAbout">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog :inline="true"  class="dialog" title="修改信息" center :visible.sync="reviseVisible" width="900px">
      <AddType  :currentType="currentType"  :visible.sync="reviseVisible" :id="currentId"></AddType>
      <div class="image-box">
        <el-divider>image</el-divider>
        <AddImage :id="currentId" group="006" type="002" class="add-img"></AddImage>
        <el-divider>banner1</el-divider>
        <AddImage :id="currentId" group="006" type="101" class="add-img"></AddImage>
        <el-divider  >banner2</el-divider>
        <AddImage :id="currentId" group="006" type="102" class="add-img"></AddImage>
        <el-divider>banner3</el-divider>
        <AddImage :id="currentId" group="006" type="103" class="add-img"></AddImage>
      </div>
    </el-dialog>


    <el-dialog   class="dialog" title="修改banner图片" @close="updateData" center :visible.sync="bannerVisible" width="900px">
        <el-divider>banner1</el-divider>
        <AddImage :id="2" group="001" type="101" class="add-img"></AddImage>
        <el-divider  >banner2</el-divider>
        <AddImage :id="2" group="001" type="102" class="add-img"></AddImage>
        <el-divider>banner3</el-divider>
        <AddImage :id="2" group="001" type="103" class="add-img"></AddImage>
    </el-dialog>-->
    <el-row style="margin-top: 10px" :gutter="25" class="row">
      <el-col :span="16" class="company">
        <el-card>
          <div class="about">
            <div class="msg">
              <div class="title">
                <h3>{{about.title}}</h3>
                <span class="sub-title">{{about.subTitle}}</span>
              </div>
              <el-button icon="el-icon-edit" circle class="btn" size="small" @click="updateBanner"></el-button>
            </div>
            <div v-html="about.content"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" class="options">
        <el-card>
          <div class="msg">
            <div class="title">
              <h3>{{itemTypes.title}}</h3>
              <span class="sub-title">{{itemTypes.sub_title}}</span>
            </div>
            <el-button icon="el-icon-edit" circle class="btn" size="small" @click="updateBanner"></el-button>
          </div>
          <el-tree
              :data="itemTypes.list"
              :props="tagName"
              accordion
              @node-click="typeDetail">
          </el-tree>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog>

    </el-dialog>
  </div>
</template>

<script>
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: "Welcome",
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive,
  },
  /*  components:{
      AddImage,
      AddType,
      Editor
    },*/
  data() {
    return {
      //swiper配置
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: 1000,
        slidesPerView: 3,
        centeredSlides: true,
        centeredSlidesBounds: true,
      },
      itemTypes: {},
      banner: [],
      about: {},
      aboutForm: '',
      tagName: {
        children: 'list',
        label: 'name',
      },
      //     currentId:'',
      //     /*工位类型*/
      //     itemTypes: {
      //       list: [],
      //       title: '',
      //       sub_title: '',
      //     },
      //     banner:'',
      //     /*标题*/
      //     titleForm: {
      //       title: '',
      //       sub_title: '',
      //     },
      //     editData:'',
      //     tagName: {
      //       children: 'list',
      //       label: 'name',
      //     },
      //     aboutForm:{
      //       title:'',
      //       subTitle:'',
      //     },
      //     /*修改Dialog是否显示*/
      //     editVisible: false,
      //     reviseVisible:false,
      //     aboutVisible:false,
      //     bannerVisible:false,
      //     currentType:'',
      //     about:'',
      //   }
      // },
      // async created() {
      //   await this.getMenuItem();
      //   await this.getAbout();
      // },
      // methods: {
      //   loadNode(node){
      //     console.log(node);
      //   },
      //
      //   /*修改事件*/
      //   edit() {
      //     this.titleForm.title = this.itemTypes.title;
      //     this.titleForm.sub_title = this.itemTypes.sub_title;
      //     this.editVisible = true;
      //   },
      //   /*获取菜单*/
      //   async getMenuItem() {
      //     const res = await this.$request.post('/console/GetItemTypes');
      //     console.log(this.itemTypes.list);
      //     this.itemTypes.list = res.data.data.list;
      //     this.itemTypes.title = res.data.data.title;
      //     this.itemTypes.sub_title = res.data.data.sub_title;
      //     this.banner=res.data.data.banner;
      //     console.log(res);
      //     console.log(this.itemTypes);
      //     sessionStorage.setItem('types', this.itemTypes);
      //   },
      //   /*获取类型信息*/
      //   async typeDetail(data,node) {
      //     let id = data.id;
      //     console.log(node);
      //     console.log(data);
      //     if (node.level!==1) {
      //       this.currentId=data.id;
      //       await this.getItemType(data.id);
      //       this.reviseVisible=true;
      //       /*let type=JSON.stringify(res.data.data);*/
      //       /*this.$router.push({path: '/index/message', query: {id}});*/
      //     }
      //   },
      //   /*提交标题修改*/
      //   async submit() {
      //     let signStr;
      //     let key = sessionStorage.getItem('key');
      //     signStr = `subtitle=${this.titleForm.sub_title}&title=${this.titleForm.title}&sign=${key}`;
      //     console.log(signStr);
      //     let sign = md5(signStr).toUpperCase();
      //     console.log(sign)
      //     let uid = sessionStorage.getItem('uid');
      //     const res = await this.$request.post('/Console/SetItemTypesTitleAboutMobile', {
      //       title: this.titleForm.title,
      //       subtitle: this.titleForm.sub_title
      //     }, {
      //       headers: {
      //         uid,
      //         sign
      //       }
      //     })
      //     this.editVisible = false;
      //     console.log(res);
      //     this.$message({
      //       type: 'success',
      //       message: res.data.errMsg
      //     })
      //     await this.getMenuItem();
      //   },
      //   async getItemType(id){
      //     console.log(id);
      //     let key = sessionStorage.getItem('key');
      //     console.log(sessionStorage.getItem('uid'));
      //     let signStr=`id=${id}&sign=${key}`;
      //     console.log(signStr);
      //     let sign=this.$md5(signStr).toUpperCase();
      //     const res = await this.$request.post('/console/GetItemType', {id}, {
      //       headers:{
      //         sign
      //       }
      //     })
      //     console.log(res);
      //     //res.data.data.price=(res.data.data.price/100).toFixed(2);
      //     if(res.data.errCode!==0){
      //       return this.$message({
      //         type:'error',
      //         message:res.data.errMsg
      //       })
      //     }
      //     console.log(res);
      //     this.currentType=res.data.data;
      //     console.log(this.currentType);
      //     this.$store.commit('getType',res.data.data);
      //   },
      //   async submitAbout(){
      //     let key=sessionStorage.getItem('key');
      //     let signStr=`subtitle=${this.aboutForm.subTitle}&title=${this.aboutForm.title}&sign=${key}`;
      //     let sign=this.$md5(signStr).toUpperCase();
      //     console.log(this.editData);
      //     const res=await this.$request.post('/Console/SetAboutAboutMobile',
      //         {
      //           title:this.aboutForm.title,
      //           subTitle:this.aboutForm.subTitle,
      //           content:this.editData,
      //         },{
      //         headers:{
      //           sign,
      //         }
      //         })
      //     console.log(res);
      //     if(res.data.errCode===0){
      //       this.$message({
      //         type:'success',
      //         message:res.data.errMsg
      //       })
      //       this.$emit('update:upToDate',1);
      //     }else{
      //       this.$message({
      //         type:'error',
      //         message:res.data.errMsg
      //       })
      //     }
      //     await this.getAbout();
      //     this.aboutVisible=false;
      //   },
      //   async updateData(){
      //     await this.getMenuItem();
    }
  },
  mounted() {
    this.getMenuItem()
    this.getAbout()
  },
  methods: {
    async getMenuItem() {
      const res = await this.$request.post('/console/GetItemTypes');
      this.itemTypes.list = res.data.data.list;
      this.itemTypes.title = res.data.data.title;
      this.itemTypes.sub_title = res.data.data.sub_title;
      this.banner = res.data.data.banner;
      console.log(res);
    },
    /*获取公司简介*/
    async getAbout() {
      let key = sessionStorage.getItem('key');
      let signStr = `sign=${key}`;
      let sign = this.$md5(signStr).toUpperCase();
      const res = await this.$request.post('/Console/GetAboutAboutMobile', {}, {
        headers: {
          sign,
        }
      })
      this.about = res.data.data;
      this.aboutForm = this.about;
      this.editData = this.about.content;
    },
    typeDetail(data, node) {
      if(node.level!==1){
        this.$router.push({path:'/index/updateitem',query:{id:data.id}});
      }
    },
    //获取工位详细信息
    async getItemType(id) {
      let key = sessionStorage.getItem('key');
      let signStr = `id=${id}&sign=${key}`;
      let sign = this.$md5(signStr).toUpperCase();
      const res = await this.$request.post('/console/GetItemType', {id}, {
        headers: {
          sign
        }
      })
      //res.data.data.price=(res.data.data.price/100).toFixed(2);
      if (res.data.errCode !== 0) {
        return this.$message({
          type: 'error',
          message: res.data.errMsg
        })
      }
      this.currentType = res.data.data;
      console.log(this.currentType);
    },
    updateBanner() {

    },
  }
}
</script>

<style scoped lang="scss">
.index {
  height: 100%;
  width: 100%;
}

.banner {
  margin-right: 45px;
  height: 180px;
  display: flex;
  position: relative;

  .btn {
    position: absolute;
    bottom: 0;
    opacity: 0.5;
    z-index: 10;
  }
}

.row {
  .msg {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .title {
      display: flex;
      align-items: baseline;
    }

    .sub-title {
      margin-left: 12px;
      font-size: 12px;
    }
  }
}

::v-deep .el-card__body {
  min-height: 400px;
}

.options {
  margin-left: 10px;
}
</style>