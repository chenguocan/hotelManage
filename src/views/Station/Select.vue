<template>
  <div>
    <!--导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>租赁管理</el-breadcrumb-item>
      <el-breadcrumb-item>筛选查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 内容区域-->
    <el-card class="rent-card">
      <el-form class="rent-form">
        <el-form-item label="所属区域:" label-width="180px">
          <el-radio-group v-model="region">
            <el-radio label="station">工位</el-radio>
            <el-radio label="meeting">会议</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--工位类型-->
        <div v-if="region==='station'">
          <el-form-item label="所属类型:" label-width="180px">
            <el-select v-model="form.type" placeholder="选择工位类型">
              <el-option label="1工位" value="one"></el-option>
              <el-option label="2工位" value="two"></el-option>
              <el-option label="4工位" value="four"></el-option>
              <el-option label="5工位" value="five"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间:" label-width="180px" >
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 221px"></el-date-picker>
          </el-form-item>
          <el-form-item label="租赁周期:" label-width="180px">
            <el-select v-model="form.period" placeholder="选择租赁周期">
              <el-option label="6" value="one"></el-option>
              <el-option label="12" value="two"></el-option>
            </el-select>
            个月
          </el-form-item>
        </div>
        <!--会议类型-->
        <div v-else>
          <el-form-item label="所属类型:" label-width="180px">
            <el-select v-model="form.type" placeholder="选择工位类型">
              <el-option label="会议室" value="meeting"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间:" label-width="180px">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 221px;"></el-date-picker>
            <el-time-picker v-model="time"
                            :picker-options="{ selectableRange: current}"
                            placeholder="任意时间点" style="width: 150px;margin-left: 15px" ></el-time-picker>
          </el-form-item>
          <el-form-item label="租赁周期:" label-width="180px">
            <el-input style="width: 221px" v-model="form.period"></el-input>
            小时
          </el-form-item>
        </div>
      </el-form>
      <el-button type="primary" style="width: 180px;margin-left: 180px">筛选</el-button>
    </el-card>
  </div>
</template>

<script>
import dayjs from "dayjs"
export default {
  name: "Select",
  data() {
    return {
      region: '',
      form: {
        type: '',
        date: '',
        search: '',
        period: '',
      },
      time:'',
      current:'',
    }
  },
  watch:{
    region:function() {
      if(this.region==='meeting'){
        this.form.period='1'
        this.form.type='meeting'
        this.time=new Date();
        this.current=dayjs(this.time).format("hh:mm:ss")
        this.current=`${this.current}-23:59:59`;
      }else{
        this.form.type='one'
        this.form.period='6'
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.region="station";
      this.form.period = "6";
      this.form.type="one"
      this.form.region = 'station';
      this.form.date = new Date();
    }
  }
}
</script>

<style scoped>
.rent-card {
  display: flex;
  justify-content: center;
  height: 450px;
}

.rent-form {
  width: 700px;
}
</style>