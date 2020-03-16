<template>
  <div>
     <el-container>
     <el-aside :style="{width:collapse?'64px':'230px'}" style="transition:all 0.5s;background-color: #2e2f32;">
       <!-- <h1>左侧导航区域</h1> -->
       <layout-aside :collapse="collapse"></layout-aside>
     </el-aside>
     <!-- 右侧 再嵌套一个 el-container -->
     <el-container>
       <!-- 再上下布局 -->
       <el-header>

         <layout-header></layout-header>
       </el-header>
       <!-- 主要区域 -->
       <!-- el-main默认加20px的内边距 -->
       <el-main style="padding:0">
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
import eventBus from '@/utils/eventBus'
export default {
  components: {
    'layout-aside': LayoutAside,
    'layout-header': LayoutHeader
  },
  data () {
    return {
      collapse: false
    }
  },
  created () {
    // 切换了折叠状态
    eventBus.$on('changeCollapse', () => {
      // 此时便是折叠状态变了
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>

</style>
