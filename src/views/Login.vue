<template>
  <div class="login-page">
    <div class="login">
      <!--标题-->
      <h2 class="title">租赁管理系统</h2>
      <!--登录表单-->
      <!--:rules="loginRules"-->
      <el-form :model="loginForm" status-icon  ref="loginForm" label-width="100px"
               class="demo-ruleForm login-form">
        <el-form-item prop="company" label-width="20px">
          <el-input type="checkPassword" v-model="loginForm.company" autocomplete="off"  placeholder="请输入公司代码"></el-input>
        </el-form-item>
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
import getMd5 from "@/lib/getMd5";
export default {
  name: "Login",
  data() {
    return {
      userInfo:'',
      loginForm: {
        company:'fe77e4c39c32be1c',
        username: '8888',
        password: '1212',
      },
    }
  },
  methods:{
    async submitLogin(){
      const res=await this.$request.post("https://www.hotelcard.cn/Publish/Base/Login",{
        company:this.loginForm.company,
        code:this.loginForm.username,
        password:this.loginForm.password,
        language:'CHN',
      })
      if(res.data.errCode!==0){
        return this.$message({
          type:'error',
          message:res.data.errMsg
        })
      }
      getMd5(res.data.data.key);
      sessionStorage.setItem('key',res.data.data.key);
      sessionStorage.setItem("uid",res.data.data.uid);
      this.$message({
        type:'success',
        message:'登录成功'
      })
      this.$router.push("/index");
    },
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
    padding-bottom: 20px;
    box-shadow: 0 0 1px gray;
    .login-btn{
      width: 330px;
      margin-left: 20px;
    }
  }
}
</style>