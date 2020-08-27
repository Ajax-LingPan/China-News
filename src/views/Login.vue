<template>
  <div>
    <hm_header>登录</hm_header>
    <hm_logo></hm_logo>
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
        :rules="rules.userpass"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
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
        userpass: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度在3到9位之间', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async login() {
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.userpass
      })
      // console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        alert(message)
      } else {
        alert(message)
      }
    }
  }
}

</script>
<style lang='less'>

</style>
