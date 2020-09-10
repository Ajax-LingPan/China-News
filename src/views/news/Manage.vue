<template>
<div class="manage">
 <hm_header>栏目管理</hm_header>
  <!-- 内容 -->
  <div class="content">
    <!-- 删除 -->
    <div class="delActive">
      <h4>点击删除频道<em>(必须保留四个以上)</em></h4>
      <span v-for="itme in delList" :key='itme.id' @click='del(itme.id)'>{{itme.name}}</span>
    </div>
    <!-- 添加 -->
    <div class="addActive">
      <h4>点击添加频道</h4>
      <span v-for='itme in addList' :key='itme.id' @click="add(itme.id)">{{itme.name}}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      delList: [],
      addList: []
    }
  },
  created() {
    const addList = JSON.parse(localStorage.getItem('addList'))
    const delList = JSON.parse(localStorage.getItem('delList'))
    if (addList) {
      this.delList = delList
      this.addList = addList
      return
    }
    this.getMange()
  },
  methods: {
    async getMange() {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.delList = data
        console.log(data)
      }
    },
    // 根据传过来的id 改变数组
    del(id) {
      if (this.delList.length <= 4) {
        this.$toast('至少保留四个栏目')
        return
      }
      // 得到点击的这个按钮
      const index = this.delList.findIndex(itme => itme.id === id)
      // 将她添加到添加 栏目中
      this.addList.push(this.delList[index])
      // 在原来的栏目删除这个按钮
      this.delList.splice(index, 1)
    },
    // 根据传过来的id 改变数组
    add(id) {
      // 得到点击的这个按钮
      const index = this.addList.findIndex(itme => itme.id === id)
      // 将她添加到添加 栏目中
      this.delList.push(this.addList[index])
      // 在原来的栏目删除这个按钮
      this.addList.splice(index, 1)
    }
  },
  watch: {
    addList: {
      deep: true,
      handler(val) {
        localStorage.setItem('delList', JSON.stringify(this.delList))
        localStorage.setItem('addList', JSON.stringify(this.addList))
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .content {
    padding: 10px 15px;
    box-sizing: border-box;
    .delActive,
    .addActive{
      width: 100%;
      span{
        display: inline-block;
        width: 20%;
        height: 30px;
        text-align: center;
        font-size: 14px;
        line-height: 30px;
        background-color: skyblue;
        border: 1px solid skyblue;
        color: #fff;
        margin: 7px;

      }
      h4{
        font-size: 16px;
        margin: 6px 0 4px 0;
      }
      em{
        font-size: 12px;
        font-style: normal;
        font-weight: normal;
        color: slategrey;
      }
    }
  }
</style>
