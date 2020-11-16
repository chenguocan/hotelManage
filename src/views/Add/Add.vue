<template>
  <div>
    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" style="height:600px;"></quill-editor>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data(){
    return{
      content:'',
      editorOptions:{
        placeholder:'请编辑内容'
      }
    }
  },
  name: "Add",
  methods:{
    onEditorChange({ editor, html, text }) {
      console.log(editor);
      console.log(text);
      this.content = html;
    },
  }
}
</script>

<style scoped>

</style>