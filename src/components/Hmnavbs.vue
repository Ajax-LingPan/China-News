<template>
 <div class="box" @click='clickfn' style=" margin-left: 15px;">
   <div class="nav_itme ">
      <div class="nav_left"><slot name="content">我的关注</slot></div>
      <div class="nav_right">
      <span class="nav_title" @click='clickfn'> <slot name="title"></slot> </span>
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    clickfn() {
      // console.log(this.to);
      if (this.to) {
        // 判断:如果父组件给当前子组件传跳转地址 则会跳转过去
        this.$router.push(this.to)
      }
      // 给 组件 注册点击事件必须在模板内 通过$emit注册  子传父的概念
      this.$emit('click')
    }
  },
  props: {
    // to是父组件传给子组件的,希望类型是字符串
    to: {
      type: String
    }
  }
}
</script>

<style  lang='less' scoped>
.nav_itme{
  height: 50px;
  line-height: 50px;
  width: 100%;
  // padding-right: 20px;
  border-bottom: 1px solid #e4e4e4;
  .nav_left{
  font-size:16px;
  color: #3f4641;
  float: left;
  }
  .nav_right{
    float:right;
    font-size: 16px;
    color: #c3b6c3;
    padding-right: 20px;
  }
  .nav_title{
    margin-right: 5px;
    margin-top: 1px;
  }

}
</style>
