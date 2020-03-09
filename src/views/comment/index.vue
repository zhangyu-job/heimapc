<template>
  <el-card>
      <!-- 放置面包屑组件 slot="header"表示面包屑会作为具名插槽给card的header部分-->
      <bread-crumb slot="header">
      <template slot="title">评论管理</template>
      </bread-crumb>
      <!-- 表格组件 -->
      <el-table :data="list">
          <!-- 使用el-table-column为列   prop表示显示的字段 -->
          <el-table-column prop="title" width="500" label="标题"></el-table-column>
          <!-- 用一个函数来返回布尔值 -->
          <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
          <el-table-column prop="total_comment_count" label="纵评论数"></el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
          <el-table-column label="操作">
              <el-button size="small" type="text">修改</el-button>
              <el-button size="small" type="text">关闭评论</el-button>
          </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [
      ]
    }
  },
  methods: {
    // 获取评论数据
    getComment () {
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment' // 此参数用来控制获取数据类型
        }
        // query参数要在axios传
        // params传get参数也就是query参数
        // data 传body参数也就是请求体参数
      }).then(result => {
        // 将返回结果的数组给list
        this.list = result.data.results
      })
    },
    formatterBool (row, column, cellValue, index) {
      // 该函数需要返回一个值  用来显示
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
