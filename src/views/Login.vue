<template>
  <div class="login-page">
    <div class="login">
      <!--标题-->
      <h2 class="title">后台管理系统</h2>
      <!--登录表单-->
      <el-form :model="ruleLoginForm" status-icon :rules="loginRules" ref="ruleLoginForm" label-width="100px"
               class="demo-ruleForm login-form">
        <el-form-item prop="username" label-width="20px">
          <el-input type="checkPassword" v-model="ruleLoginForm.username" autocomplete="off"  placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item  prop="password" label-width="20px">
          <el-input type="password" v-model="ruleLoginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!--登录按钮-->
        <el-button type="primary" class="login-btn" @click="submitLogin('ruleForm')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleLoginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur', },
        ],
      }
    }
  },
  methods:{
    submitLogin(){

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