<template>
<div class="attention">
    <hm_header>我的关注</hm_header>
     <div class="box" v-for='itme in attList' :key="itme.id">
       <div class="box_img"><img :src="$base + itme.head_img" alt=""></div>
       <div class="box_title">
        <p>{{ itme.nickname}}</p>
        <p class="twoP">{{itme.create_date | time}}</p>
    </div>
    <div class="box_user"><van-button round type="info" size="mini" color='pink' @click="unFollw(itme.id)">取消关注</van-button></div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      attList: []
    }
  },
  created() {
    this.getAttList()
  },
  methods: {
    async getAttList() {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.attList = data
      }
    },
    async unFollw(id) {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '确定取消关注'
        })
      } catch {
        return this.$toast('取消操作')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      console.log(res.data);
      if (res.data.statusCode === 200) {
        this.$toast('取消成功')
        this.getAttList()
      }
    }
  }

}
</script>

<style lang='less' scoped>
.attention {
   width: 100%;
}
.box{
  display: flex;
  width: 100%;
  height: 70px;
  align-items:center;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
  box-sizing: border-box;
  .box_img img{
    width: 45px;
    height: 45px;
    background-color: pink;
    border-radius: 50%;
  }
  .box_title{
   padding-left: 10px;
   flex: 1;
   font-size: 16px;
   .twoP{
     font-size: 14px;
     color: grey;
     margin-top: 3px;
   }
  }
  .box_user{
   font-size: 12px;
  }
}

</style>
