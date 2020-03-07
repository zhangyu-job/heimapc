<template>
  <div>
     <el-container>
     <el-aside style="width:230px">
       <!-- <h1>左侧导航区域</h1> -->
       <layout-aside>左侧</layout-aside>
     </el-aside>
     <!-- 右侧 再嵌套一个 el-container -->
     <el-container>
       <!-- 再上下布局 -->
       <el-header>
         <h1>顶部操作栏</h1>
       </el-header>
       <!-- 主要区域 -->
       <el-main>
         <h1>主要区域</h1>
          <!-- 这里应该放置 二级路由容器 -->
         <router-view></router-view>
     </el-main>
     </el-container>
   </el-container>
  </div>
</template>

<script>
import LayoutAside from '@/components/home/layout-aside'

export default {
  components: {
    'layout-aside': LayoutAside
  }
}
</script>

<style>

</style>
