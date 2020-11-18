<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>租赁管理</el-breadcrumb-item>
      <el-breadcrumb-item>租赁情况</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: "RentDetail"
}
</script>

<style scoped>

</style>