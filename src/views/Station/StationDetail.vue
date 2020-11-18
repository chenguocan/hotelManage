<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工位展示</el-breadcrumb-item>
      <el-breadcrumb-item>四工位</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-button type="primary" size="small" class="add-btn" @click="$router.push('/index/add')">添加工位</el-button>
  </div>
</template>

<script>
export default {
  name: "StationDetail"
}
</script>

<style scoped>

</style>