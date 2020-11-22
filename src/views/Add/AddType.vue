<template>
  <div>
    <el-form :model="editForm" label-width="150px">
      <el-form-item label="id">
        <el-input v-model="editForm.id" :disabled="disabled" style="max-width: 220px"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="editForm.name" style="max-width: 220px"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model.number="editForm.price" style="max-width: 220px"></el-input>
        分
      </el-form-item>
      <el-form-item label="是否在移动端显示">
        <el-select v-model="editForm.show" placeholder="请选择是否在移动端显示" style="max-width: 300px">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人数">
        <el-input v-model.number="editForm.si" style="max-width: 220px"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="editForm.state" placeholder="请选择状态" style="max-width: 300px">
          <el-option label="有效" :value="1"></el-option>
          <el-option label="无效" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子标题">
        <el-input v-model="editForm.subtitle" style="max-width: 220px"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="editForm.title" style="max-width: 220px"></el-input>
      </el-form-item>
    </el-form>
    <Editor :editData.sync="editData"></Editor>
    <div class="btn">
      <el-button type="primary" @click="onSubmit" class="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor"
import md5 from "js-md5"

export default {
  name: "AddType",
  props: ['currentType','visible','upToDate'],
  components: {
    Editor
  },
  data() {
    return {
      editData: '',
      editForm: {
        content: '',
        count: 0,
        id: '',
        name: '',
        price: 0,
        show: 0,
        si: 0,
        state: 0,
        subtitle: '',
        title: '',
      },
      disabled: true
    }
  },
  mounted() {
    if (this.currentType) {
      this.editForm.id = this.currentType.id;
      this.editForm.name = this.currentType.name;
      this.editForm.price = this.currentType.price * 100;
      /*      this.editForm.count=this.currentType.count;*/
      this.editForm.show = this.currentType.show;
      this.editForm.si = this.currentType.si;
      this.editForm.state = this.currentType.state;
      this.editForm.subtitle = this.currentType.subtitle;
      this.editForm.title = this.currentType.title;
      this.editData = this.currentType.content;
    }else{
      this.disabled=false;
    }
  },
  methods: {

    back() {
      this.$router.back(-1)
    },
    async onSubmit() {
      this.editForm.content = this.editData;
      let str = '';
      for (let key in this.editForm) {
        str += `&${key}=${this.editForm[key]}`
      }
      let key = sessionStorage.getItem('key');
      str = `${str}&sign=${key}`;
      str = str.substr(1);
      let sign = md5(str).toUpperCase();
      const res = await this.$request.post('/Console/SetItemTypeDetailAboutMobile',
          {
            "content": this.editForm.content,
            "id": this.editForm.id,
            "name": this.editForm.name,
            "price": this.editForm.price,
            "show": this.editForm.show,
            "si": this.editForm.si,
            "state": this.editForm.state,
            "subtitle": this.editForm.subtitle,
            "title": this.editForm.title,
          }, {
            headers: {
              sign
            }
          })
      if(res.data.errCode===0){
        this.$message({
          type:'success',
          message:res.data.errMsg
        })
        this.$emit('update:upToDate',1);
      }else{
        this.$message({
          type:'error',
          message:res.data.errMsg
        })
      }
      this.$emit('update:visible',false);
    },
  }
}
</script>

<style scoped lang="scss">

.btn{
  display: flex;
  justify-content: center;
}
</style>