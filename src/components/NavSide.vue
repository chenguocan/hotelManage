<template>
  <div class="nav-side">
      <el-col>
        <h5 class="nav-title">导航栏</h5>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
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
  .nav-title{
    color:white;
    text-align: center;
  }
}
</style>