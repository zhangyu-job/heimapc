<template>
  <div class="login">
      <el-card class="login-card">
          <!-- 表单 -->
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
            <!-- 表单容器 绑定model属性 rules属性-->
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
                <!-- 设置prop属性，表示要校验的字段名 -->
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" style="width:60%" placeholder="请输入验证码"></el-input>
                    <el-button style="float:right" plain>发送验证码</el-button>
                </el-form-item >
                <el-form-item prop="checked">
                    <!-- 是否同意被坑 -->
                    <el-checkbox v-model="loginForm.checked">我已阅读同意用户用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login" style="width:100%" type="primary">登录</el-button>
                </el-form-item>
            </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录的信息
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意用户协议
      },
      //   定义表单认证规则
      loginRules: {
        mobile: [{ required: true, message: '手机号不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机格式不正确' }
        ],
        code: [{ required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码不正确' }],
        //   自定义校验
        checked: [{
          validator: function (rule, value, callback) {
          // rule当前校验规则
          // value要校验的字段值
          // callback回调，不论成功与否都执行
            value ? callback() : callback(new Error('您必须同意该霸王条款'))
          }
        }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate().then(() => {
        // 如果成功，校验就会到达then
        // 通过校验后，调用接口看手机号是否正确
        this.$axios({
          url: '/authorizations',
          data: this.loginForm,
          // data:{..this.loginForm,checked:null}
          method: 'post'
        }).then(result => {
          // 成功之后，     把要是token存于本地缓存
          window.localStorage.setItem('user-token', result.data.data.token)
          // 跳转到主页
          this.$router.push('/home')
        }).catch(() => {
          // 第一种方式
          // this.$message({ message: '用户名或验证码错误', type: 'error' })
          // 第二种方式
          this.$message.error('用户名或验证码错误')
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
    height: 100vh;
    // 水平居中
    display: flex;
    justify-content: center;
    // 垂直居中
    align-items: center;
    &:before{
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url('../../assets/img/login_bg.jpg');
        // 毛玻璃效果
        filter: blur(4px);
        background-size: cover;

    }
    .login-card {
        z-index: 2;
        background: rgba(0,0,0,0);
        width: 440px;
        height: 340px;
        .title{
            text-align: center;
            img{
              width: 190px;
            }
        }
    }
}
</style>
