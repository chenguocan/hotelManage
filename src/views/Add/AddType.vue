<template>
  <div>
    <el-form :model="editForm" label-width="150px" style="width: 350px;">
      <el-form-item label="编号">
        <el-input v-model="editForm.id" :disabled="disabled" style="max-width: 180px"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="editForm.name" style="max-width: 180px"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="editForm.title" style="max-width: 180px"></el-input>
      </el-form-item>
      <el-form-item label="子标题">
        <el-input v-model="editForm.subtitle" style="max-width: 180px"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model.number="editForm.price" style="max-width: 180px"></el-input>
        分
      </el-form-item>
      <el-form-item label="移动端显示">
        <el-select v-model="editForm.show" placeholder="请选择是否在移动端显示" style="max-width: 180px">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最大人数">
        <el-input v-model.number="editForm.si" style="max-width: 180px"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="editForm.state" placeholder="请选择状态" style="max-width: 180px">
          <el-option label="有效" :value="1"></el-option>
          <el-option label="无效" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <quill-editor
        v-model="content"
        ref="myQuillEditor"
        style="height: 200px;width: 250px;margin-left: 100px"
        :options="editorOption"
        @change="onEditorChange"
    >
    </quill-editor>
    <div class="btn">
      <el-button type="primary" @click="onSubmit" class="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import md5 from "js-md5"

export default {
  name: "AddType",
  props: ['currentType','visible','id'],
  components: {
    quillEditor
  },
  data() {
    return {
      editData: '',
      content: '',
      editForm: {
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
      disabled: true,
      editorOption: {
        modules:{
          toolbar:[
            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'],     //引用，代码块
            [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
            /*            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
                        [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
                        [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
                        [{ 'direction': 'rtl' }],             // 文本方向*/
            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
            [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
            [{ 'font': [] }],     //字体
            [{ 'align': [] }],    //对齐方式
            ['clean'],    //清除字体样式
          ]
        }
      }
    }
  },
  watch:{
    currentType(){
      this.content=this.currentType.content;
      this.editForm.id = this.currentType.id;
      this.editForm.name = this.currentType.name;
      this.editForm.price = this.currentType.price;
      this.editForm.show = this.currentType.show;
      this.editForm.si = this.currentType.si;
      this.editForm.state = this.currentType.state;
      this.editForm.subtitle = this.currentType.subtitle;
      this.editForm.title = this.currentType.title;
    }
  },
  mounted() {
      this.disabled=true;
      this.editForm.id = this.currentType.id;
      this.editForm.name = this.currentType.name;
      this.editForm.price = this.currentType.price * 100;
      this.editForm.show = this.currentType.show;
      this.editForm.si = this.currentType.si;
      this.editForm.state = this.currentType.state;
      this.editForm.subtitle = this.currentType.subtitle;
      this.editForm.title = this.currentType.title;
      console.log(this.currentType);
      console.log(this.currentType.content);
      this.content = this.currentType.content;
  },
  methods: {
    async onSubmit() {
      let str = '';
      console.log(this.editForm);
      for (let key in this.editForm) {
        str += `&${key}=${this.editForm[key]}`
      }
      let key = sessionStorage.getItem('key');
      str = `${str}&sign=${key}`;
      str = str.substr(1);
      let sign = md5(str).toUpperCase();
      console.log(str);
      console.log(sign);
      const res = await this.$request.post('/Console/SetItemTypeDetailAboutMobile',
          {
            "content":this.content,
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
      console.log(res);
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
    onEditorChange(){
      console.log(this.content);
    }
  }
}
</script>

<style scoped lang="scss">
.btn{
  margin-top: 200px;
  display: flex;
  margin-left: 150px;
}
</style>