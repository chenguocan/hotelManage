<template>
  <div class="index">
    <el-container>
      <el-header>
        <div class="title">
          <h1>火云后台管理系统</h1>
        </div>
        <button @click="$router.push('/index/myimage')">xxx</button>
        <div class="user">
          <el-input placeholder="搜索从这里开始" style="width: 250px;margin-right: 20px" size="small" v-model="search">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-avatar size="large" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
          <span class="exit" @click="exit">退出</span>
        </div>
      </el-header>
      <el-container>
        <!--导航栏-->
        <el-aside :width="isCollapse?'64px':'250px'">
          <NavSide :isCollapse="isCollapse" :MenuList="menuList">
              <div class="collapse">
                <i class="el-icon-s-grid" @click="toggleCollapse"></i>
              </div>
          </NavSide>
        </el-aside>
        <!--主界面-->
        <el-container>
          <el-main :style="{'margin-left':isCollapse?'64px':'250px'}">
            <router-view></router-view>
          </el-main>
          <!--<el-footer :style="{'margin-left':isCollapse?'64px':'250px'}">Copyright © 2019-2020 xxx酒店. All rights reserved</el-footer>-->
          <!--底部栏-->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import NavSide from "@/components/NavSide";
export default {
  components:{
    NavSide,
  },
  data(){
    return{
      isCollapse:false,
      search:'',
      menuList:[],
      banner:[],
      aboutImg:[],
    }
  },
  created() {
    this.getMenu();
    this.getMenuItem()
  },
  methods:{
    gotoImage(){
      this.$router.push("/index/image");
    },
    async getMenu(){
      const res=await this.$request.post('/Console/GetMenu');
      this.menuList=res.data.data;
      if(res.data.errCode!==0){
        this.$message({
          type:'error',
          message:res.data.errMsg
        })
      }
      console.log(res);
    },
    toggleCollapse(){
      this.isCollapse=!this.isCollapse;
    },
    async exit(){
      await this.$request.post("/Base/logout");
      window.sessionStorage.clear();
      this.$message({
        type:'success',
        message:'成功退出'
      })
      this.$router.push("/login");
    },
      async getMenuItem() {
        const res = await this.$request.post('/console/GetItemTypes');
        let banner=res.data.data.banner;
        banner.forEach(item=>{
          let xxx={url:item}
          this.banner.push(xxx);
        })
        sessionStorage.setItem('types', this.itemTypes);
      },
  },
  name: 'Home',
}
</script>
<style lang="scss">
.el-container{
  height: 100%;
  width: 100%;
  .el-aside{
    height: 100%;
    width: 100%;
    position: fixed;
    background-color:#545c64;
    margin-top:60px;
    .el-icon-s-operation{
      cursor: pointer;
      float: right;
      margin:5px 5px 0 0;
    }
    .collapse{
      background: #545c64;
      font-size: 12px;
      padding:8px 0;
      display: inline-block;
      cursor: pointer;
    }
  }
  .el-header{
    width: 100%;
    display: flex;
    align-items: center;
    position:fixed;
    .title{
      display: flex;
      align-items: center;
      .icon{
        height: 50px;
      }
    }
    justify-content: space-between;
    .user{
      width: 400px;
      margin-left: 100px;
      display: flex;
      align-items: center;
      .exit{
        margin-left: 30px;
        cursor: pointer;
        color:gray;
      }
    }
  }
  .el-main{
    background: #f4f6f9;
    margin-top:60px;
    padding: 0;
  }
  .el-footer{
    margin-left: 250px;
    box-shadow: 2px 1px 2px 2px #f4f6f9;
    line-height: 60px;
  }
}
.index{
  height: 100%;
  width: 100%;
}
</style>
