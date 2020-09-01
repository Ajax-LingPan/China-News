<template>
<div class="box">
 <div class="user" @click="$router.push('/user_edit')">
   <div class="user_img">
     <img :src= 'base +user.head_img' alt="">
   </div>
   <div class="user_center">
     <span class="iconfont" :class="user.gender === 1? 'iconxingbienan' : 'iconxingbienv'"></span>
     <!-- <span class="iconfont iconxingbienv" ></span> -->
     <span class="user_name">{{user.nickname}}</span>
     <p class="user_time">{{user.create_date | time}}</p>
   </div>
     <span class="user_jiantou iconfont iconjiantou1"></span>
  </div>
 <hm_navbs to="/follow">
    <template #content>我的关注</template>
    <template #title>关注的用户</template>
 </hm_navbs>
 <hm_navbs>
    <template #content>我的帖子</template>
    <template #title>回复/点赞</template>
 </hm_navbs>
 <hm_navbs>
    <template #content>我的收藏</template>
    <template #title>文章/视频</template>
 </hm_navbs>
 <hm_navbs to="/user_edit">
    <template #content>设置</template>
 </hm_navbs>
 <div class="tuichu">
   <van-button type="primary" block @click='logout'>退出登录</van-button>
 </div>
</div>
</template>

<script>
export default {
  // 定义一个计算属性,保存axios地址,拼接数据库图片的路径
  computed: {
    base() {
      return this.$axios.defaults.baseURL
    }
  },
  data() {
    return {
      user: ''
      // name: 'LingPan',
      // stature: '185cm'
    }
  },
  async created() {
    // const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    // 定义一个res来接受异步函数传过来的参数
    const res = await this.$axios.get(`/user/${userId}`, {
      // axios设置(自定义)请求头
      // headers: {
      // // token 必须放在请求头中  请求头=> Authorizatio
      //   Authorization: token
      // }
    })
    // console.log(res)
    // 解构res.data,从里面拿到需要的数据,写判断渲染数据
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
    // 设置了全局token,就不需要考虑失败的提示
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '确定退出吗'
        })
      } catch {
        return this.$toast('取消退出')
      }
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login')
      this.$toast.success('退出成功')
    }
  }
}
</script>

<style scoped>
.user {
  display: flex;
  height: 150px;
  /* width: 100%; */
  align-items: center;
  padding:0 20px;
  /* border-bottom: 3px solid #e4e4e4; */
  border-bottom: 3px solid lime;
  /* background: linear-gradient(to right,gold,skyblue,hotpink); */
  /* animation: animation-first 0.1s linesar infinite alternate; */
  }
.user_img{
  width: 70px;
  height: 70px;
}
.user_img img{
  width: 100%;
  border-radius: 50%;
}
.user_center{
  padding-left: 20px;
}
.user_name{
  font-size: 16px;
  font-weight: 700;
  /* padding-left: 5px; */
}
.iconxingbienan{
  color: skyblue;
}
.iconxingbienv{
  color:pink
}
.user_time {
  font-size: 12px;
  padding-top: 5px;
  color: #ccc;
}
.user_jiantou {
 margin-left: 100px;
 color: #666;
}
.tuichu {
  padding:0 10px;
  margin-top: 3px;
}
@keyframes animation-first {
  0%{
    transform: translate(30%,30%);
  }
  25%{
    transform: translate(30%,-30%);
  }
  50%{
    transform: translate(-30%,-30%);
  }
  75%{
    transform: translate(-30%,30%);
  }
  100%{
    transform: translate(30%,30%);
  }
}

</style>
