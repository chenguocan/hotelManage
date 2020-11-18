<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工位管理</el-breadcrumb-item>
      <el-breadcrumb-item>工位操作</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="main-table">
      <!--表格-->
      <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" stripe border>
        <el-table-column prop="date" label="房间号" sortable width="180"></el-table-column>
        <el-table-column  label="工位类型" width="100"></el-table-column>
        <el-table-column prop="name" label="付费类型" width="180"></el-table-column>
        <el-table-column  label="价格" ></el-table-column>
        <el-table-column  label="场景" width="180"></el-table-column>
        <el-table-column  label="详情" ></el-table-column>
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
  name: "Option",
  data(){
    return{
      tableData: [{
        date: 'A01',
        name: '按月',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: 'A02',
        name: '按月',
        address: '上海市普陀区金沙江路 1517 弄'
      }],
      form: {
        name: '',
      },
      dialogFormVisible: false,
      currentPage: 4,
      search: '',
    }
  },
  methods:{
    formatter(row) {
      console.log(row);
      return row.address;
    },
  }
}
</script>

<style scoped>

</style>