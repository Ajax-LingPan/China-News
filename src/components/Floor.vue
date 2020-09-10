<template>
<!-- 先创建一个递归组件 -->
 <div>
   <!-- 放到最上面要用一个根标签重新包起来 -->
     <floor :comment='comment.parent' v-if="comment.parent"></floor>
 <div class="floor">
   <!-- 递归内容标题 -->
   <div class="title">
      <div class="one">{{comment.user.nickname}}</div>
      <div class="two">{{comment.create_date | now}}</div>
      <div class="three">回复</div>
   </div>
   <div class="content">{{comment.content}}</div>
 </div>
 </div>
</template>

<script>
export default {
  // 递归组件自己渲染自己要加name属性
  name: 'floor',
  // 父传子通过 props
  props: {
    // 传过来的comment 期望起对象类型
    comment: Object
  }
}
</script>

<style lang='less' scoped>
.floor{
  padding: 15px;
  border: 1px solid #ccc;
  // 取消边框重合的问题
  margin-top: -1px;
  .title{
    display: flex;
    .two,
    .three{
      font-weight: normal;
    }
    .two{
      margin-left: 10px;
      color:#ccc;
    }
    .three{
      margin-left: 120px;
    }
  }
  .content{
      font-size: 18px;
      color:pink;
      margin-top: 10px;
    }
.p{
   border-top:none;
}
}
</style>
