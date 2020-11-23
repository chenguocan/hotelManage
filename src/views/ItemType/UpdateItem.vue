<template>
  <div>
    <el-page-header @back="goBack" content="工位详情">
    </el-page-header>
    <ImgUpload :files.sync="files"></ImgUpload>
  </div>
</template>

<script>
import ImgUpload from "@/components/ImgUpload";
export default {
  name: "UpdateItem",
  components:{
    ImgUpload,
  },
  data() {
    return {
      files: [
        {
          url: 'https://pic3.zhimg.com/v2-058f646c41b55206f8110489d82fa103_is.jpg',
          name: 'user.jpg'
        }
      ],
    }
  },
  created() {
    console.log(this.$route.query.id);
  },
  methods:{
    goBack(){
      this.$router.back(-1);
    },
  }
}
</script>

<style scoped>

</style>