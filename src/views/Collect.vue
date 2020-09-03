<template>
 <div class="collect">
  <hm_header>我的收藏</hm_header>
  <!-- 大盒子 -->
  <div class="list" v-for='itme in list' :key="itme.id">
    <!-- 内容盒子 -->
    <div class="itme" >
      <div class="info">
        <div class="content">{{itme.title}}</div>
        <div class="user">
          <span class='onespan'>{{itme.user.nickname}}</span>
          <span class="twospan">{{itme.comments.length}}跟帖</span>
        </div>
      </div>
    </div>
    <!-- 图片盒子 -->
    <div class="itmeImg">
      <img :src="$url (itme.cover[0].url)" alt="">
    </div>
  </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      list: ''
    }
  },
  created() {
    this.getCollect()
  },
  methods: {
    async getCollect() {
      const res = await this.$axios.get('/user_star')
      // console.log(res.data)
      const { statusCode, data } = res.data
      console.log(res.data)
      if (statusCode === 200) {
        this.list = data
      }
    }
  }
}
</script>

<style lang='less' scoped>
 .list{
   display: flex;
   border-bottom:1px solid #ccc;
   padding:10px;
   box-sizing: border-box;
 }
 .itme{
   flex:1;
   position: relative;

 }
 .info {

    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
   .content{
     font-size: 16px;
   }
   .user{
     position: absolute;
     bottom: 0;
     font-size: 14px;
     .onespan{
       color: red;
     }
       .twospan{
      margin-left: 5px;
     }
   }
 }
 .itmeImg{
    img{
      width: 120px;
      height: 74px;
      object-fit: cover;
    }
 }
</style>
