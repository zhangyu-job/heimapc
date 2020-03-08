<template>
  <div>
     <el-container>
     <el-aside style="width:230px">
       <!-- <h1>左侧导航区域</h1> -->
       <layout-aside></layout-aside>
     </el-aside>
     <!-- 右侧 再嵌套一个 el-container -->
     <el-container>
       <!-- 再上下布局 -->
       <el-header>

         <layout-header></layout-header>
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
import LayoutHeader from '@/components/home/layout-header'

export default {
  components: {
    'layout-aside': LayoutAside,
    'layout-header': LayoutHeader
  }
}
</script>

<style>

</style>
