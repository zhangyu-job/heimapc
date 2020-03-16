<template>
  <div class="second-home">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in list" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>

    <!-- 放置图表组件 -->
    <el-row type="flex" justify="space-around">
    <div ref="myChart" class="echarts"></div>
    <div ref="myChart2" class="echarts"></div>

    </el-row>
  </div>
</template>

<script>
// 引入图标模块
import ECharts from 'echarts'
export default {
  mounted () {
    // 实例化
    this.myChart = ECharts.init(this.$refs.myChart)
    this.myChart2 = ECharts.init(this.$refs.myChart2)
    this.myChart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    })

    this.myChart2.setOption({
      backgroundColor: '#2c343c',

      title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 274, name: '联盟广告' },
            { value: 235, name: '视频广告' },
            { value: 400, name: '搜索引擎' }
          ].sort(function (a, b) { return a.value - b.value }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200
          }
        }
      ]
    })
  },
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
  .echarts{
    width: 600px;
    height: 400px;
  }
}
</style>
