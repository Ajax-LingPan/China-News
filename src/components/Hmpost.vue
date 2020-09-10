<template>
  <div class="post" @click="$router.push(`/details/${post.id}`)">
    <!-- 视频 -->
    <div class="video" v-if=" post.type === 2">
      <div class="cont">{{post.title}}</div>
      <div class="videos">
        <span class="iconfont iconshipin"></span>
        <img :src="$url(post.cover[0].url)" alt="">
      </div>
      <div class="user">
        <span class="one">{{post.user.nickname}}</span>
        <span class="two">{{post.comment_length}}跟帖</span>
      </div>

    </div>
    <!-- 根据cover.length的长度 判断单图片显示操作 -->
   <div class="list" v-else-if="post.cover.length < 3 ">
      <div class="itme" >
        <div class="info">
          <div class="content">{{post.title}}</div>
          <div class="user">
            <span class='onespan'>{{post.user.nickname}}</span>
            <span class="twospan">{{post.comment_length}}跟帖</span>
          </div>
        </div>
      </div>
     <div class="itmeImg">
      <img :src="$url(post.cover[0].url)" alt="">
     </div>
   </div>
   <!-- 多张图片 -->
   <div class="listimg" v-else>
     <div class="content">{{post.title}}</div>
     <div class="imgs">
       <img :src="$url(post.cover[0].url)" alt="">
       <img :src="$url(post.cover[1].url)" alt="">
       <img :src="$url(post.cover[2].url)" alt="">
     </div>
     <div class="user">
       <span>{{post.user.nickname}}</span>
       <span>{{post.comment_length}}</span>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang='less' scoped>
// 单图片模块
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
//  多图片模块
.listimg{
  padding:10px;
  border-bottom:1px solid #ccc;
  box-sizing: border-box;
  .content{
    font-size: 16px;
  }
  .imgs{
   width: 100%;
   img{
     width: 33%;
     height: 74px;
   }

  }
}
// 视频模块
.video{
  padding:20px;
  box-sizing: border-box;
  border-bottom:1px solid #ccc;

  .cont{
    font-size: 16px;
  }
  .videos{
    width: 100%;
    position: relative;
    padding-top: 10px;
    box-sizing: border-box;
    img{
      width: 100%;
      height: 170px;
      object-fit: cover;
    }
    .iconshipin{
     position: absolute;
     top:50%;
     left: 50%;
     transform: translate(-50%,-50%);
     display: inline-block;
     width: 54px;
     height: 54px;
     text-align: center;
     line-height: 54px;
     color: honeydew;
     font-size: 40px;
     background-color: rgba(0,0,0,.7);
     border-radius: 50%;
   }
  }
  .user{
    span{
  font-size:  14px;
  }

    }
    .two{
  margin-left: 4px;
    }
  }
</style>
