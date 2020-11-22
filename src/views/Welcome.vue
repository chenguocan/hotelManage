<template>
  <div>
    <!--banner-->
    <el-carousel :interval="4000" type="card" height="150px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-card class="about">
      <div class="image">
      </div>
    </el-card>
   <!-- 公司简介-->
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
      <!--工位展示-->
      <el-tree
          :data="itemTypes.list"
          :props="tagName"
          accordion
          @node-click="typeDetail">
      </el-tree>
    </el-card>
    <el-dialog title="修改标题" center :visible.sync="editVisible">
      <el-form :model="titleForm">
        <el-form-item label="标题">
          <el-input v-model="titleForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="子标题">
          <el-input v-model="titleForm.sub_title" placeholder="请输入子标题"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import md5 from "js-md5"
export default {
  name: "Welcome",
  data() {
    return {
      /*工位类型*/
      itemTypes: {
        list: [],
        title: '',
        sub_title: '',
      },
      /*标题*/
      titleForm: {
        title: '',
        sub_title: '',
      },
      tagName: {
        children: 'list',
        label: 'name',
      },
      /*修改Dialog是否显示*/
      editVisible: false,
    }
  },
  mounted() {
    this.getMenuItem();
  },
  methods: {
    /*修改事件*/
    edit() {
      this.titleForm.title = this.itemTypes.title;
      this.titleForm.sub_title = this.itemTypes.sub_title;
      this.editVisible = true;
    },
    /*获取菜单*/
    async getMenuItem() {
      const res = await this.$request.post('/console/GetItemTypes');
      console.log(this.itemTypes.list);
      this.itemTypes.list = res.data.data.list;
      this.itemTypes.title = res.data.data.title;
      this.itemTypes.sub_title = res.data.data.sub_title;
      console.log(res);
      console.log(this.itemTypes);
      sessionStorage.setItem('types',this.itemTypes);
    },
    /*获取类型信息*/
    async typeDetail(data) {
      let id = data.id;
      if (id.length === 8) {
        /*let type=JSON.stringify(res.data.data);*/
        this.$router.push({path: '/index/message', query: {id}});
      }
    },
    /*提交标题修改*/
    async submit(){
      let signStr;
      let key=sessionStorage.getItem('key');
      signStr=`subtitle=${this.titleForm.sub_title}&title=${this.titleForm.title}&sign=${key}`;
      console.log(signStr);
      let sign=md5(signStr).toUpperCase();
      console.log(sign)
      let uid=sessionStorage.getItem('uid');
      const res=await this.$request.post('/Console/SetItemTypesTitleAboutMobile',{
        title:this.titleForm.title,
        subtitle:this.titleForm.sub_title
      },{
        headers:{
          uid,
          sign
        }
      })
      this.editVisible=false;
      console.log(res);
      this.$message({
        type:'success',
        message:res.data.errMsg
      })
      await this.getMenuItem();
    }
  }
}
</script>

<style scoped lang="scss">

.about {
  margin-bottom: 10px;

  .image {
    height: 100px;
    width: 100px;
  }
}

.title {
  display: flex;
  /*  height: 50px;*/
  justify-content: space-between;
  align-items: center;

  .titleDetail {
    display: flex;
    align-items: baseline;
  }

  .sub_title {
    font-size: 12px;
    margin-left: 12px;
  }
}

</style>