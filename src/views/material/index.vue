<template>
  <!-- el-card布局 -->
  <el-card>
    <!-- 放置面包屑 将面包屑给到卡片的具名header -->
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 放置标签页 v-model绑定的值就是当前选中的页签-->
    <el-tabs v-model="activeName" @tab-click="changeTab">
        <!-- 放置label标签  表示显示的名称  name表示页签选中的值 -->
        <el-tab-pane label="全部素材" name="all">
            <!-- 内容  循环生成页面结构 -->
            <div class="img-list">
                <!-- 采用v-for对list数据进行循环 -->
                <el-card class="img-card" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                    <!-- 操作栏 -->
                    <el-row class="operate" type="flex" justify="space-around" align="middle" >
                        <i class="el-icon-star-on"></i>
                        <i class="el-icon-delete-solid"></i>
                    </el-row>
                </el-card>
            </div>
        </el-tab-pane>

        <el-tab-pane label="收藏素材" name="collect">
            <!-- 内容  循环生成页面结构 -->
            <div class="img-list">
                <!-- 采用v-for对list数据进行循环 -->
                <el-card class="img-card" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
    <!-- 放置一个公共的分页组件 -->
    <el-row type="flex" justify="center" style="height:80px" align="middle">
        <!-- 放置分页组件
        监听分页组件的切换事件
         -->

         <el-pagination background :total="page.total"
         :current-page="page.currentPage"
         :page-size="page.pageSize"
         layout="prev,pager,next" @current-change="changePage"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前激活的是收藏页
      list: [], // 全部素材的数据   接收全部素材
      // 专门的对象存放分页信息
      page: {
        currentPage: 1, // 默认第一页
        total: 0, // 当前总数
        pageSize: 8 // 每页多少条
      }
    }
  },
  methods: {
    // 点击分页跳转
    changePage (newPage) {
      this.page.currentPage = newPage // 将新页码赋值给页码数据
      this.getMaterial() // 获取数据
    },
    // 获取素材数据
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect', // 根据当前页签来决定收藏素材是否显示
          page: this.page.currentPage, // 取页码变量中的值  只要页码变量一变获取的数也跟着变
          per_page: this.page.pageSize
        },
        data: {} // 存放body参数
      }).then(result => {
        // 将返回的数据  赋值到data中的数据
        this.list = result.data.results
        // 将总条数赋值给total变量
        this.page.total = result.data.total_count
      })
    },
    changeTab () {
      this.page.currentPage = 1 // 将页码重置为第一页   因为分类变了  数据变了
      // 点击切换事件，根据activeName来决定是否获取那个方面的数据
      this.getMaterial() // 获取素材数据
    }
  },
  created () {
    // 实例化之后   调用获取素材数据
    this.getMaterial()
  }
}
</script>

<style lang="less" scorpt>
.img-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card{
        width: 220px;
        height: 240px;
        margin: 20px 40px;
        position: relative;
        img{
            width: 100%;
            height: 100%;

        }
        .operate{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: #f4f5f6;
            height: 30px;
            i{
                font-size: 20px;
            }
        }
    }
}
</style>
