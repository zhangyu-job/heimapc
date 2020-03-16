<template>
  <div class="layout-aside">
      <!-- 头部logo -->
      <div class="title">
          <img :src="collapse?smallImg:bigImg" alt="">
      </div>
      <!-- 导航菜单 开启路由模式 :router="true"(完整模式)  router(简写模式)-->
      <el-menu :collapse="collapse" router background-color="#323745" text-color="#adafb5">
          <!-- 没有子菜单 -->
          <el-menu-item>
              <i class="el-icon-s-home"></i>
              <span>首页</span>
          </el-menu-item>
          <!-- 有子菜单 -->
          <el-submenu index="1">
              <template slot="title">
                  <i class="el-icon-s-grid"></i>
                  <span>内容管理</span>
              </template>
              <!-- 匿名插槽是二级菜单，具名插槽是一级菜单 -->

              <el-menu-item index='/home/publish'>发布文章</el-menu-item>
              <el-menu-item index='/home/articles'>内容列表</el-menu-item>
              <el-menu-item index='/home/comment'>评论列表</el-menu-item>
              <el-menu-item index='/home/material'>素材管理</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
              <template slot="title">
                  <i class="el-icon-s-opportunity"></i>
                  <span>粉丝管理</span>
              </template>
              <!-- 匿名插槽是二级菜单，具名插槽是一级菜单 -->

              <el-menu-item index='/home/picture'>图文数据</el-menu-item>
              <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
              <el-menu-item index='/home/fansphoto'>粉丝图像</el-menu-item>
              <el-menu-item index='/home/fanslist'>粉丝管理</el-menu-item>
          </el-submenu>

          <el-menu-item index='/home/account'>
              <i class="el-icon-user-solid"></i>
              <span >个人信息</span>
           </el-menu-item>
      </el-menu>
  </div>

</template>

<script>
export default {
  props: ['collapse'], // 接收父组件传出来的变量
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang="less" scoped>
.layout-aside{

    background-color: #2e2f32;
    height: 100vh;
    // width: 230px;
    .title{
        text-align: center;
        padding: 10px 0;
        img{
            height: 35px;
        }
    }
    .el-menu{
        border-right: none;
    }
}
</style>
