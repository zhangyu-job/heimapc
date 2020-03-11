<template>
  <el-card v-loading="loading">
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
    <!-- 放置分页组件 -->
    <el-row style="height:80px" type="flex" align="middle" justify="center">

    <el-pagination background layout="prev,pager,next"
    :page-size="page.pageSize"
    :current-page="page.currentPage"
    :total="page.total"
    @current-change="changePage">
    </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 分页参数单独放置一个对象
      page: {
        total: 0,
        currentPage: 1, // 默认的页码决定了当前页码是第几页
        pageSize: 10 // 每页显示多少条
      },
      list: [
      ],
      loading: false // 控制loading遮罩层的显示或隐藏
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      // 将最新页码赋值给当前页码
      this.page.currentPage = newPage
      this.getComment()
    },
    // 获取评论数据
    getComment () {
      this.loading = true // 打开遮罩层
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment', // 此参数用来控制获取数据类型
          page: this.page.currentPage, // 查对应页
          per_page: this.page.pageSize // 查20条
        }
        // query参数要在axios传
        // params传get参数也就是query参数
        // data 传body参数也就是请求体参数
      }).then(result => {
        // 将返回结果的数组给list
        this.list = result.data.results
        // 获取完数据之后，将页数总数赋值给total
        this.page.total = result.data.total_count
        this.loading = false // 请求完毕 关闭遮罩层
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
