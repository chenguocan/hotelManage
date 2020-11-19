<template>
  <div class="login-page">
    <div class="login">
      <!--标题-->
      <h2 class="title">磐基莲花里共享办公</h2>
      <!--登录表单-->
      <!--:rules="loginRules"-->
      <el-form :model="loginForm" status-icon  ref="loginForm" label-width="100px"
               class="demo-ruleForm login-form">
        <el-form-item prop="username" label-width="20px">
          <el-input type="checkPassword" v-model="loginForm.username" autocomplete="off"  placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item  prop="password" label-width="20px">
          <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!--登录按钮-->
        <el-button type="primary" class="login-btn" @click="submitLogin('ruleForm')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
//import axios from "axios"
export default {
  name: "Login",
  data() {
    return {
      userInfo:'',
      loginForm: {
        username: '',
        password: '',
      },
    }
  },
  methods:{
    async submitLogin(){
/*      let company="fe77e4c39c32be1c";
      let language="CHN"
      const res=await axios.post("https://www.hotelcard.cn/Publish/Base/Login",{
        company,
        code:this.loginForm.username,
        password:this.loginForm.password,
        language,
      })
      if(res.status!==200){
        return this.$message({
          type:'error',
          message:'登录失败'
        })
      }*/
      sessionStorage.setItem("token",'123');
      this.$router.push("/index");
    }
  }
}
</script>

<style scoped lang="scss">
.login-page{
  background: #e9ecef;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .title{
    text-align: center;
  }
  .login {
    background: white;
    width: 350px;
    height: 300px;
    padding-right: 20px;
    box-shadow: 0 0 1px gray;
    .login-btn{
      width: 330px;
      margin-left: 20px;
    }
  }
}
</style>