<template>
  <div class="second-home">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in list" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'http://img2.imgtn.bdimg.com/it/u=3313838802,2768404782&fm=26&gp=0.jpg',
        'http://attach.bbs.miui.com/forum/201204/17/1539083wxpexg5b0fbvzpv.jpg',
        'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1212/10/c1/16491670_1355126816487.jpg',
        'http://pic1.win4000.com/wallpaper/d/579ffb3260839.jpg'
      ]
    }
  }
}
</script>

<style lang="less">
.second-home {
  /* calc 在css中计算数值 变量之间和运算符之间一定要有空格*/
  height: calc(100vh - 60px);
  background-color: pink;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
