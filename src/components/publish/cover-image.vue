<template>
  <div class="cover-image">
      <div v-for="(item,index) in list" @click="openDialog(index)" :key="index" class="cover-image-item">
          <!-- 图片地址应该是item -->
          <!-- 开始时还没选择图片 item是空字符串 此时根据item是否有值来决定显示的是默认图片还是item -->
          <!-- img不是固定地址的话  图片先转化为变量 -->
          <img :src="item?item :defaultImg" alt="">
      </div>

      <!-- 采用element-ul的弹层组件 -->
      <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
          <!-- 再次封装一个选择图片的组件 -->
          <!-- 监听谁就在谁的标签上写v-on/@ -->

          <select-image @selectOneImg="receiveImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收父组件传过来的值
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 默认图片  需要先将其转成变量
      dialogVisible: false, // 控制弹层的显示与隐藏
      selectIndex: -1 // 记录你点击了哪张图片
    }
  },
  methods: {
    // 点击图片时弹出一个层
    openDialog (index) {
      this.dialogVisible = true // 显示弹层
      this.selectIndex = index // 记录点击了哪张图片
    },
    // 接收传递的地址
    receiveImg (url) {
      // 拿到图片地址之后，由于props数据只能读取  ，不能修改   所以要再次传递
      this.$emit('selectTwoImg', url, this.selectIndex) // 再次将数据传给父组件
      // 关闭弹层
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
    display: flex;
    margin:20px 100px;
    .cover-image-item{
        border: 1px solid #ccc;
        width: 250px;
        height: 250px;
        padding: 20px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
