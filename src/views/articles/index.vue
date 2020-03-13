<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 搜索工具栏 -->
    <!-- 表单容器 -->
    <el-form style="padding-left:50px">
      <el-form-item label="文章状态 :">
        <!-- 放置单选按钮 -->
        <!-- 第一种方案 -->
        <!-- <el-radio-group v-model="searchForm.status" @change="changeCondition"> -->
        <el-radio-group v-model="searchForm.status" >
          <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败  不传为全部，定义5 -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道类型 :">
        <!-- 选择器 -->
        <!-- 第一种方案 -->
        <!-- <el-select placeholder="请选择频道" @change="changeCondition" v-model="searchForm.channel_id"> -->
        <el-select placeholder="请选择频道"  v-model="searchForm.channel_id">
          <!-- el-option是下拉选项，label是显示的值，value是绑定的值 -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期范围 :">
        <!-- 日期选择器 设置type属性为daterange  表示选择的是一个日期范围 使用value-format指定绑定值格式-->
        <!-- 第一种方案 -->
        <!-- <el-date-picker type="daterange" @change="changeCondition" value-format="yyyy-MM-dd" v-model="searchForm.dateRange"></el-date-picker> -->
        <el-date-picker type="daterange"  value-format="yyyy-MM-dd" v-model="searchForm.dateRange"></el-date-picker>
      </el-form-item>
    </el-form>

    <!-- //文章的主体结构 -->
    <el-row class="title" type="flex" align="middle">
      <span>共找到99条符合条件的内容</span>
    </el-row>
    <!-- 列表内容 article-item作为循环项-->
    <div class="article-item" v-for="item in list" :key="item.id.toString()">
      <!-- 左侧内容 -->
      <div class="left">
          <!-- 设置文章封面 -->

        <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt />
        <div class="info">
          <span>{{item.title}}</span>
          <el-tag :type="item.status|filterType" class="tag">{{item.status|filterStatus}}</el-tag>
          <span class="date">{{item.pubdate}}</span>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="right">
        <span>
          <i class="el-icon-edit">修改</i>
        </span>
        <span>
          <i class="el-icon-delete">删除</i>
        </span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个表单数据对象
      // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败  不传为全部，定义5
      searchForm: {
        status: 5, // 默认为全部状态
        channel_id: null, // 表示没有任何频道
        dateRange: [] // 日期范围
      },
      channels: [], // 专门来接收频道数据
      list: [], // 定义list数据接收文章列表
      defaultImg: require('../../assets/img/dog.jpg') // 地址变成了对象
    }
  },
  // 监听data中的数据变化   第二种解决方案 watch监听对象的深度监听方案
  watch: {
    searchForm: {
      deep: true, // 固定写法，表示会深度检测searchForm中的数据变化
      handler () {
        // handler也是固定写法   一旦数据发生任何变化  就会触发更新
        this.changeCondition() // this指向当前组件实例
      }
    }
  },
  // 过滤器，专门处理显示格式
  filters: {
    // 过滤器的第一个参数是value
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 根据不同类型值显示不同标签
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  methods: {
    // 改变了选择条件
    changeCondition () {
      // 当触发此方法  表单数据已经是最新的了，接下来组装条件
      const params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id, // 就是表单数据
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }

      // 通过接口传入
      this.getArticales(params)
    },
    //   获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获取频道接口的数据
        this.channels = result.data.channels
      })
    },
    // 获取文章列表
    getArticales (params) {
      this.$axios({
        url: '/articles',
        params // es6
      }).then(result => {
        this.list = result.data.results // 获取文章列表
      })
    }

  },
  created () {
    // 获取频道数据
    this.getChannels()
    this.getArticales()
  }
}
</script>

<style lang="less" scoped>
.articles {
  .title {
    height: 60px;
    border-bottom: 1px dashed #ccc;
  }
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    .left {
      display: flex;
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        display: flex;
        flex-direction: column;
        height: 100px;
        justify-content: space-around;
        margin-left: 10px;
        .date {
          color: #999;
          font-size: 12px;
        }
        .tag {
          width: 60px;
          text-align: center;
        }
      }
    }
    .right {
      span {
        font-size: 12px;
        margin-right: 8px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>
