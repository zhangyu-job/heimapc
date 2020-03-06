<template>
  <div class="login">
      <el-card class="login-card">
          <!-- 表单 -->
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
            <!-- 表单容器 -->
            <el-form style="margin-top:20px">
                <el-form-item>
                    <el-input placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item>
                    <el-input style="width:60%" placeholder="请输入验证码"></el-input>
                    <el-button style="float:right" plain>发送验证码</el-button>
                </el-form-item>
                <el-from-item>
                    <!-- 是否同意被坑 -->
                    <el-checkbox>我已阅读同意用户用户协议和隐私条款</el-checkbox>
                </el-from-item>
                <el-from-item>
                    <el-button style="width:100%;margin-top:20px" type="primary">登录</el-button>
                </el-from-item>
            </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.login {
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    // 水平居中
    display: flex;
    justify-content: center;
    // 垂直居中
    align-items: center;
    .login-card {
        width: 440px;
        height: 340px;
        .title{
            text-align: center;
        }
    }
}
</style>
