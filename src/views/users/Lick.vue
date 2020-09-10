<template>
<div class="lick">
  <div class="box"></div>
  <hm_header>我的点赞</hm_header>
 <van-pull-refresh v-model="refreshing" @refresh="onRefresh" loading-text='柴式微笑...'>
   <van-list
     v-model="loading"
     :finished="finished"
     finished-text="我也是有底线的"
     loading-text='柴式微笑,请稍等!'
     :immediate-check= 'false'
     offset="10"
    @load="onLoad">
    <!-- 把模板嵌套在list列表组件中 -->
    <div class="lick_info" v-for='itme in lickList' :key='itme.id'>
       <div class="lick_time">{{itme.create_date | time('YYYY-MM-DD HH:mm')}}</div>
          <div class="content" v-if='itme.parent'>
            <div class="huifu">回复:{{itme.parent.user.nickname}} </div>
         <div class="lick_content">{{itme.parent.content}}</div>
       </div>
      <div class="lick_name" v-else>{{itme.content}}</div>
      <div class="lick_title">
        <span class="text">{{itme.post.title}}</span>
        <span class="iconfont iconfontjiantou1">></span>
     </div>
    </div>
  </van-list>
 </van-pull-refresh>
</div>
</template>

<script>
export default {
  data() {
    return {
      lickList: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 7,
      refreshing: false
    }
  },
  created() {
    this.getLickInfo()
  },
  methods: {
    async getLickInfo() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 把加载来的数据合并到前面的数组中,生成新数组
        // this.lickList = this.lickList.concat(data)
        // 推荐用展开运算符
        this.lickList = [...this.lickList, ...data]
        //  把控制onLoad加载的布尔值改为false
        this.loading = false
        // 判断 如果数组中数据的长度少于当前条数,提示文本显示
        if (data.length < this.pageSize) {
          this.finished = true
        }
        // 下拉刷新最后一步 清除下拉
        this.refreshing = false
      }
    },
    onLoad() {
      // 当onLoad被触发时 让页数加1 同时发送请求,重新渲染数据
      this.pageIndex++
      this.getLickInfo()
    },
    onRefresh() {
      console.log('正在刷新数据')
      setTimeout(() => {
        this.finished = false
        this.loading = true
        this.pageIndex = 1
        this.lickList = []
        this.getLickInfo()
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.box{
  height: 50px;
  width: 100%;
}
.hm_header{
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #fff;
  z-index: 999;

}
.lick_info{
  padding: 20px 15px 10px 15px;
  border-bottom: 1px solid grey;
  .lick_time{
    font-size: 14px;
    color: #ccc;
    margin-bottom: 5px;
  }
  .lick_name{
    font-size: 16px;
    margin: 10px 0;
  }
  .lick_title,
  .lick_content,
  .huifu{
    // display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: skyblue;
    margin-bottom: 5px;
    .iconfontjiantou1 {
     margin-left: 40px;
    }
  }
  .content {
    padding: 10px 15px;
    background-color: slategrey;
  }
.text{
  // display: inline-block;
  // width: 50px;
  color: red;
}
}
</style>
