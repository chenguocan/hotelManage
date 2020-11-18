<template>
  <div>
    <!--导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工位管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加工位</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-card class="rent-card">
      <el-form>
        <el-form-item label="所属类型:" label-width="180px">
          <el-select placeholder="选择工位类型">
            <el-option label="1工位" value="one"></el-option>
            <el-option label="2工位" value="two"></el-option>
            <el-option label="4工位" value="four"></el-option>
            <el-option label="5工位" value="five"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间:" label-width="180px">
          <el-date-picker type="date" placeholder="选择日期" style="width: 221px"></el-date-picker>
        </el-form-item>
        <el-form-item label="租赁周期:" label-width="180px">
          <el-select placeholder="选择租赁周期">
            <el-option label="6" value="one"></el-option>
            <el-option label="12" value="two"></el-option>
          </el-select>
          个月
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AddStation"
}
</script>

<style scoped>
.rent-card {
  display: flex;
  justify-content: center;
  height: 450px;
}
</style>