<template>
  <div class="nav-side">
      <el-col>
        <div class="nav-title"><slot></slot></div>
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#3C3C3C"
            text-color="#fff"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>工位展示</span>
            </template>
            <el-menu-item index="1-1" @click="goToPage('/stationdetail')">四工位</el-menu-item>
            <el-menu-item index="1-2" @click="goToPage('/stationdetail')">八工位</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>工位管理</span>
            </template>
            <el-menu-item index="2-1" @click="goToPage('/add')">添加工位</el-menu-item>
            <el-menu-item index="2-2" @click="goToPage('/option')">工位操作</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>租赁管理</span>
            </template>
            <el-menu-item index="3-1" @click="goToPage('/rentDetail')">租赁情况</el-menu-item>
          </el-submenu>
<!--          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>租赁管理</span>
            </template>
              <el-menu-item index="1-1" @click="goToPage('/select')">筛选查询</el-menu-item>
              <el-menu-item index="1-2" @click="goToPage('/person')">人员详情</el-menu-item>
          </el-submenu>-->
        </el-menu>
      </el-col>
  </div>
</template>

<script>
export default {
  name: "NavSide",
  props:['isCollapse'],
  methods:{
    handleClose(){
      console.log("close");
    },
    handleOpen(){
      console.log("open");
    },
    goToPage(path){
      this.$router.push('/index'+path);
    }
  }
}
</script>

<style scoped lang="scss">
.nav-side{
  width: 100%;
  .el-menu{
    border-right: 0;
  }
  .nav-title{
    color:white;
    text-align: center;
  }
}
</style>