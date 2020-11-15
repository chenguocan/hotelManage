<template>
  <div>
    <el-header>
      <img class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605436528491&di=989a24966e62bada47f63a3d38a42429&imgtype=0&src=http%3A%2F%2Fimg.huoyuan51.com%2F2020%2F04%2F14yb820Q0ceB.jpg" />
      <h1>酒店管理系统</h1>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "HeaderPage"
}
</script>

<style scoped lang="scss">
.el-header{
  display: flex;
  align-items: center;
  .icon{
    height: 50px;
  }
  border-bottom: 1px solid gray;
}
</style>