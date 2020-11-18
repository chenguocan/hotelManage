<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>人员详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="option">
      <el-button type="primary" size="small" class="add-btn" @click="$router.push('/index/add')">添加人员</el-button>
      <el-input placeholder="请输入内容" size="small" v-model="search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="main-table">
      <!--表格-->
      <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" stripe border>
        <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>
        <!--编辑和删除-->
        <el-table-column label="操作" width="120" class="options">
          <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-table-column>
      </el-table>
    </div>
    <!--对话框-->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Person",
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      form: {
        name: '',
      },
      dialogFormVisible: false,
      currentPage: 4,
      search: '',
    }
  },
  methods: {
    formatter(row) {
      console.log(row);
      return row.address;
    },
  }
}
</script>

<style scoped lang="scss">
.option{
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-input{
    width: 300px;
  }
  margin: 20px;
}
</style>