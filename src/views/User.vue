<template>
<div class="box">
 <div class="user">
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
 <hm_navbs to="/edit">
    <template #content>设置</template>
 </hm_navbs>
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
    }
  },
  async created() {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    // 定义一个res来接受异步函数传过来的参数
    const res = await this.$axios.get(`/user/${userId}`, {
      // axios设置(自定义)请求头
      headers: {
      // token 必须放在请求头中  请求头=> Authorizatio
        Authorization: token
      }
    })
    // console.log(res)
    // 解构res.data,从里面拿到需要的数据
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
      console.log(data);
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
