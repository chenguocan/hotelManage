<template>
  <div>
    <!--导航栏-->
    <el-page-header  content="门锁管理">
    </el-page-header>
    <div class="addLock">
      <el-button size="small" type="primary" >添加门锁</el-button>
    </div>
   <!-- 表格-->
    <div class="table">
      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            prop="date"
            label="门锁编号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        <el-table-column
            width="180"
            label="操作">
          <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5,10,15,20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 4,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style lang="scss">
.addLock{
  float: right;
  margin: 10px 20px;
}
.table{
  margin-top: 10px;
}
.block{
  margin-top: 10px;
}
</style>