<template>
  <div class="index">
    <el-container>
      <el-header>
        <div class="title">
          <img class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605436528491&di=989a24966e62bada47f63a3d38a42429&imgtype=0&src=http%3A%2F%2Fimg.huoyuan51.com%2F2020%2F04%2F14yb820Q0ceB.jpg" />
          <h1>租赁管理系统</h1>
        </div>
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
    }
  },
  created() {
    this.getMenu();
  },
  methods:{
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
    }
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
