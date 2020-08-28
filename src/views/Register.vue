<template>
<div>
  <hm_header>注册</hm_header>
  <hm_logo></hm_logo>
<!-- 注册组件引入 -->
  <van-form @submit='register'>
    <van-field
      v-model="user.nickname"
      label="昵称"
      placeholder="请输入昵称"
      :rules='rules.nickname'
    />
    <van-field
      v-model="user.username"
      label="账号"
      placeholder="请输入账号"
      :rules='rules.username'
    />
    <van-field
      v-model="user.password"
      type="password"
      label="密码"
      placeholder="请输入密码"
      :rules='rules.password'
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        注册
      </van-button>
    </div>
    <p class="tips">已有账号?去 <router-link to='/login' class="router_register">登录</router-link> </p>
  </van-form>
</div>
</template>
<script>
// import axios from 'axios'
export default {
  data() {
    return {
      user: {
        nickname: '',
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名需在5到11位之间', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度在3到9位之间', trigger: 'onChange' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'onChange' },
          { pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '昵称长度在2-6个字符之间', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async register() {
      // 因为axios挂载到vue原型上,且基地址也绑定,所以可以采用简写
      const res = await this.$axios.post('/register', this.user)
      // console.log(res.data);
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // 注册成功后跳转到login页面
        this.$router.push('/login')
      } else {
        this.$toast(message)
      }
    }
  }
}
</script>

<style>
.tips{
  font-size: 14px;
  text-align:right;
  padding-right:20px;
}
.router_register{
  color: red;
}
</style>
