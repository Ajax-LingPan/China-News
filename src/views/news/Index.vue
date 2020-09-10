<template>
<div class="index">
  <!-- 大盒子 -->
  <div class="mianBox">
    <!-- 顶部盒子 -->
    <div class="boxTop">
      <!-- 左边logo -->
      <div class="boxLogo">
        <span class="iconfont iconnew"></span>
      </div>
      <!-- 中间search内容 -->
      <div class="search" @click="$router.push('/tosearch')">
        <span class="iconfont iconsearch"></span>
        <span class="titleBox">搜索新闻</span>
      </div>
      <!-- 登录logo -->
      <div class="loginBox">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏 -->
    <van-sticky>
          <div class="more" @click="$router.push('/manage')">
            <span class="jiahao">+</span>
          </div>
   </van-sticky>
   <van-tabs v-model="active" sticky animated swipeable >
     <!-- 标题部分 -->
     <van-tab :title="itme.name" v-for='itme in list' :key="itme.id">
       <!-- 下拉刷新 -->
       <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
         <!-- 上拉刷新 -->
         <van-list v-model="loading" :finished="finished" finished-text="----我也是有底线的----" @load="onLoad" :immediate-check="false">
           <!-- 内容部分 -->
            <post :post='post' v-for="post in newlist" :key="post.id"></post>
        </van-list>
         <van-sticky>
          <div class="more" @click="$router.push('/manage')">
            <span class="iconfont iconlianjie">+</span>
          </div>
        </van-sticky>
      </van-pull-refresh>
     </van-tab>
  </van-tabs>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list: [],
      newlist: [],
      pageIndex: 1,
      pageSize: 6,
      finished: false,
      loading: false,
      refreshing: false
    }
  },
  created() {
    this.getIndex()
  },
  methods: {
    // 获取首页的标题列表
    async getIndex() {
      const res = await this.$axios.get('/category')
      // 获取首页列表前先判断缓存中是否有缓存的列表
      const delList = JSON.parse(localStorage.getItem('delList'))
      // 如果有的话 优先渲染缓存中的数据
      if (delList) {
        this.list = delList
        this.getNewInfo(this.list[0].id)
        return
      }
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        this.getNewInfo(this.list[0].id)
      }
    },
    async getNewInfo(id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newlist = [...this.newlist, ...data]
        // 数据加载完成后,手动改状态为false
        this.loading = false
        this.refreshing = false
        // 当数据少与数据长度时,提示没有数据
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      this.pageIndex++
      this.getNewInfo(this.list[this.active].id)
    },
    onRefresh() {
      this.newlist = []
      this.pageIndex = 1
      this.loading = true
      this.finished = false
      this.getNewInfo(this.list[this.active].id)
      this.$toast('刷新成功')
    }
  },
  // 监听active 有变化了就更新数据
  watch: {
    active(val) {
      this.newlist = []
      this.pageIndex = 1
      this.loading = true
      this.finished = false
      this.getNewInfo(this.list[this.active].id)
    }
  }
}
</script>

<style lang='less' scoped>
.boxTop {
  width: 100%;
  height: 50px;
  display: flex;
  padding:0 15px;
  box-sizing: border-box;
  justify-content:space-between;
  align-items: center;
  background-color:red;
  color: #FFF;
  .boxLogo{
     width: 54px;
      height: 54px;
    .iconnew{
      font-weight: 400;
      font-size: 50px;
      // color: #FFF;
    }
  }
  .search{
    width: 240px;
    height: 34px;
    background-color: #f97979;
    border-radius: 17px;
    text-align: center;
    line-height: 34px;
    font-size: 14px;
    .titleBox{
      margin-left: 3px;
    }
  }
  .loginBox{
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    span{
  font-weight: 400;
    font-size: 26px;
    }
  }
}
/deep/ .van-tabs__wrap {
  width: 85%;
}
.van-sticky {
  position: relative;
}
.more {
  width: 15%;
  height: 44px;
  position: absolute;
  right: 0;
  z-index: 999;
  background-color: #fff;
  text-align: center;
  line-height: 44px;
}
.jiahao{
  font-size: 30px;
  color: #ff0000;
}
</style>
