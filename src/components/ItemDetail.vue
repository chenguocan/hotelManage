<template>
  <div>
    <div class="detail">
      <div class="itemForm">
        <el-form label-position="right" :inline="true" size="mini"  :model="itemForm" class="demo-form-inline">
          <el-form-item label="编号">
            <el-input v-model="itemForm.id" :disabled="true" style="max-width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="itemForm.name" style="max-width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="itemForm.title" style="max-width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="子标题">
            <el-input v-model="itemForm.subtitle" style="max-width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model.number="itemForm.price" style="max-width: 180px"></el-input>
            分
          </el-form-item>
          <el-form-item label="移动端显示">
            <el-select v-model="itemForm.show" placeholder="请选择是否在移动端显示" style="max-width: 180px">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最大人数">
            <el-input v-model.number="itemForm.si" style="max-width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="itemForm.state" placeholder="请选择状态" style="max-width: 180px">
              <el-option label="有效" :value="1"></el-option>
              <el-option label="无效" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="itemEditor">
          <editor :edit-data.sync="itemForm.content"></editor>
        </div>
        <el-button type="primary" >修改</el-button>
      </div>
      <ul class="imageList">
        <li class="imageItem">
          <item-img :file="typeFile"></item-img>
        </li>
        <li class="imageItem" v-for="(item,index) in banner" :key="index">
          <item-img :file="item"  />
        </li>
      </ul>

    </div>

  </div>
</template>

<script>
import Editor from "@/components/Editor";
import ItemImg from "@/components/ItemImg";
export default {
  props:["id"],
  name: "ItemDetail",
  components:{
    Editor,
    ItemImg
  },
  data(){
    return{
      itemForm:{},
      typeFile:[],
      itemFile:[],
      banner:[],
    }
  },
  created() {
    this.getItemType(this.id);
  },
  methods:{
    async getItemType(id) {
      let key = sessionStorage.getItem('key');
      let signStr = `id=${id}&sign=${key}`;
      let sign = this.$md5(signStr).toUpperCase();
      const res = await this.$request.post('/console/GetItemType', {id}, {
        headers: {
          sign
        }
      })
      //res.data.data.price=(res.data.data.price/100).toFixed(2);
      if (res.data.errCode !== 0) {
        return this.$message({
          type: 'error',
          message: res.data.errMsg
        })
      }
      console.log(res);
      let banner=res.data.data.banner;
      banner.forEach(item=>{
        let xxx=[{url:item}]
        this.banner.push(xxx);
      })
      this.itemForm=res.data.data;
      let typeFile={url:res.data.data.image};
      this.typeFile=this.typeFile.push(typeFile);
    },
  }
}
</script>

<style scoped>
.detail{
  display: flex;
  margin-left: 50px;
}
.itemForm{
  width: 600px;
}
.itemEditor{
  width: 600px;
  height: 375px;
}
.imageItem{
  margin-left: 50px;
  margin-top: 5px;
}
</style>
