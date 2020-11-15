<template>
  <div class="index">
    <el-container>
      <el-header>
        <img class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605436528491&di=989a24966e62bada47f63a3d38a42429&imgtype=0&src=http%3A%2F%2Fimg.huoyuan51.com%2F2020%2F04%2F14yb820Q0ceB.jpg" />
        <h1>酒店管理系统</h1>
      </el-header>
      <el-container>
        <!--导航栏-->
        <el-aside width="250px">
          <NavSide></NavSide>
        </el-aside>
        <!--主界面-->
        <el-container>
          <el-main>您上次登录的时间:</el-main>
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
  name: 'Home',

}
</script>
<style lang="scss">
.el-container{
  height: 100%;
  width: 100%;
  .el-aside{
    background-color:#545c64;
    text-color:#fff;
  }
  .el-header{
    display: flex;
    align-items: center;
    .icon{
      height: 50px;
    }
    box-shadow: 0 1px 1px lightgray;
  }
  .el-footer{
      box-shadow: 2px 1px 1px 2px lightgray;
    line-height: 60px;
  }
}
.index{
  height: 100%;
  width: 100%;
}
</style>
