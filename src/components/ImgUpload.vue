<template>
  <div>
    <VueUploadImgs
        multiple
        compress
        :before-read="beforeRead"
        :after-read="afterRead"
        :before-remove="beforeRemove"
        :limit="limit"
        :type="0"
        @preview="preview"
        @exceed="exceed"
        @oversize="oversize"
        v-model="files"
    >
    </VueUploadImgs>
  </div>
</template>

<script>
export default {
  props:['files'],
  name: "UpdateItem",
  data() {
    return {
      maxSize: 1024 * 10, // 10 KB
      previewIMG: null,
      limit: 1,
      isPreview: false,
      type: 2, // 0 预览模式 1 列表模式 2 预览模式 + 上传按钮
    }
  },
  methods:{
    goBack(){
      this.$router.back(-1);
    },
    oversize(file) {
      console.log('oversize')
      console.log('filesize:' + file.size / 1024 + 'KB')
    },

    afterRead(file) {
      console.log('after-read')
      console.log(file)
    },

    beforeRemove(index, file) {
      console.log(index, file)
      console.log(this.files);
      console.log(file);
      this.$emit('update:files',file);
      return true
    },

    preview(index, file) {
      this.previewIMG = file.url
      this.isPreview = true
    },

    exceed() {
      alert(`只能上传${this.limit}张图片`)
    },

    beforeRead(files) {
      console.log('before-read')
      for (let i = 0, len = files.length; i < len; i++) {
        const file = files[i]
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
          alert('只能上传jpg和png格式的图片')
          return false
        }
      }
      return true
    },

    closePreview() {
      this.isPreview = false
    }
  }
}
</script>

<style scoped>

</style>