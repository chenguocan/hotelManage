<template>
  <div class="index">
    <el-container>
      <el-header>
        <div class="title">
          <img class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605436528491&di=989a24966e62bada47f63a3d38a42429&imgtype=0&src=http%3A%2F%2Fimg.huoyuan51.com%2F2020%2F04%2F14yb820Q0ceB.jpg" />
          <h1>酒店管理系统</h1>
        </div>
        <div class="user"><span  @click="exit">退出</span></div>
      </el-header>
      <el-container>
        <!--导航栏-->
        <el-aside :width="isCollapse?'100px':'250px'">
          <NavSide :isCollapse="isCollapse">
            <i class="el-icon-s-operation" @click="xxx" />
          </NavSide>
        </el-aside>
        <!--主界面-->
        <el-container>
          <el-main :style="{'margin-left':isCollapse?'100px':'250px'}">
            <router-view></router-view>
          </el-main>
          <el-footer>Copyright © 2019-2020 xxx酒店. All rights reserved</el-footer>
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
      isCollapse:false
    }
  },
  methods:{
    xxx(){
      this.isCollapse=!this.isCollapse;
    },
    exit(){
      this.$router.push("/");
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
      color:gray;
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
