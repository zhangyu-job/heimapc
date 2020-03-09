<template>
  <el-row align="middle" type="flex" class="layout-header">
      <el-col class="left" :span="12">
          <i class="el-icon-s-unfold"></i>
          <span>晃晃宠物机构</span>
      </el-col>
      <!-- 右侧 -->
      <el-col class="right" :span="12" >
       <!-- 再次放置一个 row组件  align属性设置垂直对齐方式  justify设置 水平对齐属性-->
       <el-row type="flex" justify="end" align="middle">
          <img :src="userInfo.photo" alt="">
          <!-- 下拉菜单 点击菜单会触发command事件-->
          <el-dropdown @command="clickMenu">
              <span>{{userInfo.name}}</span>
              <!-- 下拉内容需要具名插槽 -->
              <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item command="info">个人信息</el-dropdown-item>
                 <el-dropdown-item command="git">git地址</el-dropdown-item>
                 <el-dropdown-item command="lgout">退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>

       </el-row>
      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {
        //   点击了个人信息
      } else if (command === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/94-heimatoutiaopc'
      } else {
        //   退出系统  1.删除token 2.跳转回登录页
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    // const token = localStorage.getItem('user-token') // 拿钥匙，从缓存中取token
    this.$axios({
      url: '/user/profile' // 请求地址
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).then(result => {
      // 加载成功要将数据复制给userInfo
      this.userInfo = result.data
    })
  }
}
</script>

<style lang="less" scoped>
    .layout-header{
        height: 60px;
        .left{
            i{
                font-size: 20px;
            }
        }
        .right {
            img {
                width: 40px;
                height: 40px;
                border-radius:50%;
                margin-right:4px;
            }
        }
    }
</style>
