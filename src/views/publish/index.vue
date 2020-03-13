<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>

    <!-- 表单组件 标题宽度设置于el-form组件-->
    <el-form ref="myForm" :model="publishForm" :rules="publishRules" style="padding-left:50px" label-width="100px">

      <el-form-item label="标题" prop="title">
        <el-input v-model="publishForm.title" style="width:60%" aria-placeholder="请输入您的标题" ></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content">
          <el-input v-model="publishForm.content" type="textarea" :rows="4" aria-placeholder="请输入您的内容" ></el-input>
      </el-form-item>

      <el-form-item label="封面" prop="cover">
          <el-radio-group v-model="publishForm.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
      </el-form-item>

      <el-form-item label="频道" prop="channel_id">
        <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
            <!-- 下拉选项 v-for循环生成-->
          <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
          <el-button @click="publish(false)" type="primary">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      // 发布表单数据
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // -1自动 0 无图 1 单图 3 三图
          images: [] // 字符串数组  对应type
        },
        channel_id: null // 频道id
      },
      // 发布文章的校验规则
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }, {
          min: 5, max: 30, message: '标题长度应该在5-30之间', trigger: 'blur'
        }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道内容不能为空', trigger: 'blur' }]
      }

    }
  },
  methods: {
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获取频道接口返回的数据
        this.channels = result.data.channels
      })
    },
    // 发布
    publish (draft) {
    // this.$refs 来获取el-form实例
      this.$refs.myForm.validate().then(() => {
        // 表明校验成功  调用发布接口
        this.$axios({
          method: 'post',
          url: '/articles',
          params: { draft }, // query参数
          data: this.publishForm // 请求体body参数
        }).then(() => {
          this.$message.success('发布成功')
          // 发布成功，跳转到文章列表页
          this.$router.push('/home/articles')
        }).catch(() => {
          this.$message.error('发布失败')
        })
      })
    }
  },
  created () {
    // 调用获取频道数据方法
    this.getChannels()
  }
}
</script>

<style>
</style>
