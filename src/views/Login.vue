<template>
  <div>
    <hm_header>登录</hm_header>
    <hm_logo></hm_logo>
    <!-- 登录组件 -->
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="用户名"
        label="账号"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" color="skyblue">
          登录
        </van-button>
      </div>
      <p class="tips">没有账号?去 <router-link to='/register' class="router_register">注册</router-link> </p>
    </van-form>
  </div>
</template>
<script>
// 下载的axios 在哪里用就在那里导入
// import axios from 'axios'
export default {
  created() {
    // query,params这两个都可以通过$route 拿到数据
    // console.log(this.$route.params);
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  data() {
    return {
      username: '',
      password: '',
      // 这里把表单校验的代码放到js中来写了
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名需在5到11位之间', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度在3到9位之间', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async login() {
      // 因为axios挂载到vue原型上,且基地址也绑定,所以可以采用简写
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      // 对象结构 提取res对象中 statusCode message data的属性
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        // vant中的属性可以通过$直接调用,因为已经挂载到vue的原型上了
        this.$toast.success(message)
        // 校验通过跳转到user页面
        this.$router.push('/user')
        // 获取当前登录用户的 token 和 id
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        // console.log(data.user.id, data.token)
      } else {
        this.$toast(message)
      }
    }
  }
}

</script>
<style scoped>
.tips{
  font-size: 14px;
  text-align:right;
  padding-right:20px;
}
.router_register{
  color: red;
}
</style>
