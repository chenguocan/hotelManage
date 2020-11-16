<template>
  <div class="nav-side">
      <el-col>
        <div class="nav-title">|||</div>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            :collapse="isCollapse"
            :collapse-transition="false"
            active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu>
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
    margin: 10px 0;
    color:white;
    text-align: center;
  }
}
</style>