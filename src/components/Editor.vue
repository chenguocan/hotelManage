
<template>
  <div class="edit_container">
    <quill-editor
        v-model="content"
        ref="myQuillEditor"
        style="width: inherit;height: 250px"
        :options="editorOption"
        @change="onEditorChange"
        >
    </quill-editor>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  props:['editData'],
  components: {
    quillEditor
  },
  data() {
    return {
      content:this.editData,
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
/*            [{ 'font': [] }],     //字体*/
            [{ 'align': [] }],    //对齐方式
            ['clean'],    //清除字体样式
            ['image','video']
          ]
        }
      }
    }
  },
  mounted() {
    this.content=this.editData;
   },
  watch:{
    editData(val){
      console.log(val);
      this.content=this.editData;
    }
  },
  methods: {
    onEditorChange(){
      this.$emit('update:editData',this.content);
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  }
}
</script>
<style lang="scss">
</style>
