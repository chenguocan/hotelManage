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
          <el-submenu :index="item.id" v-for="(item) in MenuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{item.name}}</span>
            </template>
            <template v-if="item.menu">
              <div v-for="item2 in item.menu" :key="item2.id">
                  <el-submenu :index="item2.id" v-if="item2.menu">
                    <template slot="title">
                      <span>{{item2.name}}</span>
                    </template>
                    <el-menu-item :index="item3.id" v-for="item3 in item2.menu" :key="item3.id">
                      <template slot="title">
                        <span>{{item3.name}}</span>
                      </template>
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item :index="item2.id" v-else>
                    <template>
                      <span>{{item2.name}}</span>
                    </template>
                  </el-menu-item>
              </div>
            </template>
          </el-submenu>
        </el-menu>
      </el-col>
  </div>
</template>

<script>
export default {
  name: "NavSide",
  props:['isCollapse','MenuList'],
  methods:{
    handleClose(){
      console.log("close");
    },
    handleOpen(index){
      console.log(index);
    },
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