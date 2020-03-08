<template>
  <el-row align="middle" type="flex" class="layout-header">
      <el-col class="left" :span="12">
          <i class="el-icon-unfold"></i>
          <span>晃晃宠物机构</span>
      </el-col>
      <!-- 右侧 -->
      <el-col class="right" :span="12" >
       <!-- 再次放置一个 row组件  align属性设置垂直对齐方式  justify设置 水平对齐属性-->
       <el-row type="flex" justify="end" align="middle">
          <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4019918972,823734246&fm=26&gp=0.jpg" alt="">
          <!-- 下拉菜单 -->
          <el-dropdown>
              <span>晃晃</span>
              <!-- 下拉内容需要具名插槽 -->
              <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item>个人信息</el-dropdown-item>
                 <el-dropdown-item>git地址</el-dropdown-item>
                 <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>

       </el-row>
      </el-col>
  </el-row>
</template>

<script>
export default {

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
