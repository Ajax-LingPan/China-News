<template>
<div class="tosearch">
  <div class="top">
    <div class="left iconfont iconjiantou2" @click="$router.back()"></div>
    <div class="content">
      <span class="iconfont iconsearch"></span>
      <input type="search" placeholder="在线给杰哥捶腿" v-model='value'  @keyup.enter="search" @input="tuijian">
    </div>
    <div class="right" @click="search">搜索</div>
  </div>
  <!-- 渲染搜索的组件 -->
  <div class="list" v-if="list.length">
    <post v-for="itme in list" :key="itme.id" :post='itme'></post>
  </div>
   <!-- 推荐关键字的组件 -->
  <div class="recommend" v-else-if='recommend.length' v-for="itme in recommend" :key="itme.id">
    <div class='itmes'>{{itme.title}}</div>
  </div>
  <!-- .历史记录 -->
  <div class="sousuo"  v-else>
    <div class="history">
    <h4>历史记录</h4>
    <span class="content" v-for="itme in history" :key="itme" @click="Onsearch(itme)">{{itme}}</span>
  </div>
  <div class="history two">
    <h4>热门搜索</h4>
    <span class="content">办公司小野否认解散</span>
    <span class="content">办公司小野否认解散</span>
  </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      // 定义搜索响应回来的数据的空数组
      list: [],
      // 定义一个历史缓存的空数组
      history: [],
      // 推荐空数组
      recommend: []
    }
  },
  created() {
    // 数据挂在前先去缓存中拿history数据,或者是一个空数组 赋值给定义的空数组
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  methods: {
    async search() {
      // 判断输入的内容,为空return出去
      if (!this.value) return this.$toast('请输入正确关键字')
      // 发送搜索请求
      const res = await this.$axios.get('/post_search', {
        params: {
          // 把表单中请求的数据提交
          keyword: this.value
        }
      })
      // 结构判断
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 响应回来的数据赋值给一个新数组
        this.list = data
      }
      // 过滤出跟history数组中,不一样的关键字
      this.history = this.history.filter(itme => itme !== this.value)
      // 讲这个关键字添加到history前面
      this.history.unshift(this.value)
      // 把这个关键字存到缓冲中去 转成字符串
      localStorage.setItem('history', JSON.stringify(this.history))
    },
    // 按照历史记录搜索
    Onsearch(itme) {
      this.value = itme
      this.search()
    },
    // 推荐关键字
    async tuijian() {
      console.log(this.value)
      if (!this.value) return
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.value
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommend = data
      }
    }
  }
}
</script>

<style lang='less' scoped>
.top{
   padding: 10px;
  display: flex;
  align-items: center;
  .content{
    margin-left: 20px;
    position: relative;
    flex: 1;
    input{
      width: 254px;
      height: 32px;
      border: 1px solid #ccc;
      border-radius: 16px;
      font-size: 14px;
      padding-left: 25px;
      box-sizing: border-box;
    }
    .iconfont {
      position: absolute;
      top: 8px;
      left:7px
    }
  }
  .right{
    font-size: 16px;
  }
}
.history{
   padding: 10px;
  width: 100%;
  margin:15px 0;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;

  h4{
    font-size: 14px;
    margin-bottom: 5px;
  }
  span{
    // display: inline-block;
    // width: 30%;
    font-size: 12px;
    margin: 5px;
  }
}
.two {
  border:none;
  margin-top: 40px;
}
.recommend{
  padding-left: 50px;
  font-size: 16px;
  .itmes{
    margin: 5px 0;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
</style>
