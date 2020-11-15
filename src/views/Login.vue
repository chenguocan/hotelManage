<template>
  <div class="login-page">
    <div class="login">
      <h2 class="title">后台管理系统</h2>
      <el-form :model="ruleLoginForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
               class="demo-ruleForm login-form">
        <el-form-item prop="username" label-width="20px">
          <el-input type="password" v-model="ruleLoginForm.username" autocomplete="off"  placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item  prop="password" label-width="20px">
          <el-input type="password" v-model="ruleLoginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" class="login-btn" @click="submitForm('ruleForm')">登录</el-button>
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
      rules: {
        username: [
          {required: false, message: '账号不能为空'}
        ],
        password: [
          {required: false, message: '密码不能为空'}
        ],
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-page{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .title{
    text-align: center;
  }
  .login {
    width: 400px;
    height: 300px;
    padding-right: 20px;
    border: 1px solid gray;
    .login-btn{
      width: 380px;
      margin-left: 20px;
    }
  }
}
</style>