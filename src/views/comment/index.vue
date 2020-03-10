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
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <!-- 文本内容要根据当前行的评论状态显示打开或者关闭 -->
          <!-- 作用域插槽---子组件中的数据，通过插槽传出slot-scope接收 -->
          <el-button
            @click="openOrClose(obj.row)"
            size="small"
            type="text"
          >{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
        </template>
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
    },
    // 打开或者关闭评论
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        // 调用是否打开或者关闭接口
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString() // 要求文章idBigNumber类型转化为字符串
            // 前端传字符串到后端，后端会将字符串转化为大数字类型
            // 只需要保证id与传过去的id一致就行
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(() => {
          // 成功，提示消息，拉取数据
          this.$message.success(`${mess}评论成功`)
        }).catch(() => {
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
