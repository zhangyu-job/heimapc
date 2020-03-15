<template>
  <el-card>
      <!-- 账户信息 -->
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>

      <!-- 放置表单容器 -->
      <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px">
          <!-- 表单域 -->
          <el-form-item label="用户名" prop="name">
              <el-input v-model="formData.name" style="width:30%"></el-input>
          </el-form-item>

          <el-form-item label="简介">
              <el-input v-model="formData.intro" style="width:30%"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" style="width:30%"></el-input>
          </el-form-item>

          <el-form-item label="手机号">
              <el-input v-model="formData.mobile" disabled style="width:30%"></el-input>
          </el-form-item>

          <el-form-item >
              <el-button type="primary" @click="saveUser">保存</el-button>
          </el-form-item>

      </el-form>
          <!-- 头像 -->
          <img class="head-upload"  :src="formData.photo?formData.photo:defaultImg" alt="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '用户名格式不正确', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, message: '邮箱格式不正确', trigger: 'blur' }]
      },
      defaultImg: require('../../assets/img/dog.jpg') // 头像变量
    }
  },
  methods: {
    // 获取用户个人资料
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        // 将数据赋值给表单数据
        this.formData = result.data
      })
    },
    saveUser () {
      // 手动校验表单数据
      this.$refs.myForm.validate().then(() => {
        //   调用保存接口
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(() => {
          this.$message.success('保存用户信息成功')
        }).catch(() => {
          this.$message.error('保存用户信息失败')
        })
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style>
.head-upload{
    position: absolute;
    right: 400px;
    top: 120px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
}
</style>
