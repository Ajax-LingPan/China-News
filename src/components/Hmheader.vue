<template>
  <div class="hm_header">
<!-- 左边箭头 -->
    <div class="back" @click='back'>
      <span class="iconfont iconjiantou2"></span>
    </div>
<!-- 中间标题 -->
    <div class="title"><slot></slot></div>
    <div class="extra"></div>
  </div>
</template>
<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
      console.log(111);
    }
  }
}
</script>
<style lang="less">
  .hm_header{
    height: 50px;
    border-bottom: 1px solid #ccc;
    display: flex;
    text-align: center;
    line-height: 50px;
  }
  .back,
  .extra{
      width: 50px;
    }
    .title{
      font-size: 18px;
      font-weight: bold;
      flex: 1;
    }
    .iconfont{
      font-size:  16px;
      font-weight:bold;
    }
</style>
