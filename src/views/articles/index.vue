<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">文章列表</template>
      </bread-crumb>
      <!-- 搜索工具栏 -->
      <!-- 表单容器 -->
      <el-form style="padding-left:50px">
          <el-form-item label="文章状态 :">
              <!-- 放置单选按钮 -->
              <el-radio-group v-model="searchForm.status">

              <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败  不传为全部，定义5 -->
                <el-radio label="5">全部</el-radio>
                <el-radio label="0">草稿</el-radio>
                <el-radio label="1">待审核</el-radio>
                <el-radio label="2">审核通过</el-radio>
                <el-radio label="3">审核失败</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道类型 :">
              <!-- 选择器 -->
                <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                    <!-- el-option是下拉选项，label是显示的值，value是绑定的值 -->
                    <el-option v-for="item in channels" :key="item.id" label="item.name" :value="item.id"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="日期范围 :">
              <!-- 日期选择器 设置type属性为daterange  表示选择的是一个日期范围-->
              <el-date-picker type="daterange" v-model="searchForm.dateRange"></el-date-picker>
          </el-form-item>
      </el-form>
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
      channels: [] // 专门来接收频道数据
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获取频道接口的数据
        this.channels = result.data.channels
      })
    }
  },
  created () {
    // 获取频道数据
    this.getChannels()
  }
}
</script>

<style>

</style>
