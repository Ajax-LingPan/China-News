<template>
<div class="details">
  <!-- 头部 -->
  <div class="box">
    <div class="details_top">
         <div class="left" @click="$router.back()">
          <div class="iconfont iconjiantou"></div>
         </div>
         <div class="center">
          <span class="iconfont iconnew"></span>
         </div>
        <div class="right" >
          <span class="yes" v-if='list.has_follow' @click="quxiaoguanzhu">已关注</span>
          <span class="no" v-else  @click="guanzhu">关注</span>
        </div>
    </div>
    <!-- 标题 -->
    <div class="title">{{list.title}}</div>
    <div class="user">
      <span class="one">{{list.user.nickname}}</span>
      <span class="two">{{list.create_date | time}}</span>
    </div>
    <!-- 内容 -->
    <div class="content">
        <div class="content_box" v-html='list.content'  v-if='list.type===1'>
        </div>
        <div class="video" v-else>
          <video :src="geturl(list.content)" width="100%" height="100%" autoplay controls></video>
        </div>
    </div>
    <div class="zan">
      <div class="left_box" @click="dianzan">
        <span class="iconfont icondianzan" :class="{red: list.has_like}"></span>
        <span class="one">{{list.like_length}}</span>
      </div>
      <div class="rgiht_box">
        <span class="iconfont iconweixin"></span>
        <span class="two">微信</span>
      </div>
    </div>
  </div>
  <!-- 组件渲染 -->
  <div class="commList">
    <h3>精彩跟帖</h3>
    <comment :comment='comment' v-for="comment in comment" :key="comment.id" ></comment>
  </div>
  <!-- 底部 -->
  <div class="footer">
    <div class="search"><input type="text" placeholder="评论"></div>
    <div class="icon">
      <em>111</em>
      <span class="iconfont iconpinglun-"></span>
      <span class="iconfont iconshoucang"></span>
      <span class="iconfont iconfenxiang"></span>
      </div>
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      list: {
        user: {}
      },
      comment: ''
    }
  },
  created() {
    this.getDetails()
    this.getComment()
  },
  methods: {
    async getDetails() {
      // const id = this.$route.params.id
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async getComment() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      console.log(res.data);
      if (statusCode === 200) {
        this.comment = data
      }
      console.log(this.comment);
    },
    geturl(url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    // 关注
    async guanzhu() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请先登录')
        this.$router.push({
          path: '/login',
          query: { back: true }
        })
        return
      }
      const res = await this.$axios.get(`/user_follows/${this.list.user.id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast('关注成功')
        this.getDetails()
      }
    },
    // 取消关注
    async quxiaoguanzhu() {
      const res = await this.$axios.get(`/user_unfollow/${this.list.user.id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast('已取消关注')
        this.getDetails()
      }
      return false
    },
    async dianzan() {
      // // 获取token
      const token = localStorage.getItem('token')
      // 判断是否有token,没有就跳login页面
      if (!token) {
        this.$toast('请先登录')
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return true
      } else {
        const res = await this.$axios.get(`/post_like/${this.list.id}`)
        const { statusCode } = res.data
        if (statusCode === 200) {
          this.getDetails()
        }
        return false
      }
    }
  }

}
</script>

<style lang='less' scoped>
.box {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
  .iconjiantou{
    font-size: 16px;
  }
  .details_top{
    display: flex;
    align-items: center;
    height: 50px;

  }
  .center{
    margin-left: 5px;
    flex:1;
      .iconnew{
        font-size: 50px;
        font-weight: 400;
      }
  }
  .right{
    // flex: 1;
    span{
      display: inline-block;
      font-size: 12px;
      text-align: center;
      line-height: 26px;
      width: 60px;
      height: 24px;
      border-radius: 12px;
      border:1px solid #ccc
    }
    .yes{
      background-color: grey;
      color: #FFF;
    }
    .no{
      background-color: red;
      color: #fff;
    }
  }
  .user{
      .one{
        font-size: 16px;
      }
      .two{
        font-size: 14px;
        color: #999;
        margin-left: 5px;
      }
  }
  .content{
    width: 100%;
    margin: 10px 0;
    line-height: 28px;
    .content_box{
      width: 100%;
      font-size: 18px;
    }
  }
  .zan{
    margin: 40px 0 20px 0;
    display: flex;
    justify-content: space-around;
    .left_box,
    .rgiht_box{
      width: 60px;
      height: 24px;
      line-height: 24px;
      border:1px solid #ccc;
      font-size: 14px;
      text-align: center;
      border-radius: 12px;
      background-color: mintcream;
      .two,
      .one{
        margin-left: 3px;
      }
      .iconweixin{
        color: limegreen;
        font-weight:400;
      }
      .red{
        color: red;
      }
    }
  }

}
.commList{
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 50px;
  h3{
    text-align: center;
    font-size: 16px;
  }
}
.footer{
  background-color: #ffffff;
  padding:10px;
   width: 100%;
   height: 30px;
   line-height: 30px;
   display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  .search{
    input{
      background-color: #ccc;
      width: 180px;
      height: 30px;
      border: 1px solid #ccc;
      font-size: 14px;
      border-radius: 15px;
      padding-left: 5px;
      box-sizing: border-box;
    }
  }
  .icon{
    position: relative;
    // display: flex;
    span{
      margin: 0 10px;
      font-size: 14px;
    }
    em{
      display: inline-block;
      position: absolute;
      top: 1px;
      left:15px;
      background-color: red;
      font-size: 8px;
      text-align: center;
      line-height: 16px;
      border: 1px solid red;
      border-radius: 5px;
    }
  }
}
/deep/.photo {
  width: 100%;
  img{
    width: 100%;
  }
}
</style>
