<template>
<div class="user_edit">
  <hm_header>编辑中心</hm_header>
  <div class="edit_img">
    <img :src="$axios.defaults.baseURL + user.head_img" alt="">
    <van-uploader :after-read="upFilesImg"/>
  </div>
 <hm_navbs  @click='editNick'>
    <template #content>修改昵称</template>
    <template #title>{{user.nickname}}</template>
 </hm_navbs>
 <hm_navbs  @click='editPass'>
    <template #content>修改密码</template>
    <template #title>******</template>
 </hm_navbs>
  <hm_navbs  @click='editGender'>
    <template #content>性别</template>
    <template #title>{{user.gender === 1 ? '男':'女'}}</template>
 </hm_navbs>

 <!-- 编辑昵称 -->
 <van-dialog  class="userDialog" v-model="nickshow" title="编辑昵称" show-cancel-button @confirm='setNick'>
   <van-field class="userField" v-model="clickname"  ref="editNick" placeholder="请输入用户名" />
 </van-dialog>
 <!-- 修改密码 -->
 <van-dialog  class="userDialog" v-model="passshow" title="输入新密码" show-cancel-button @confirm='setPass'>
   <van-field class="userField"  ref="editPass"  v-model="clickPass"  />
 </van-dialog>
 <!-- 修改性别 -->
 <van-dialog  class="userDialog" v-model="gendershow"  title="修改性别" show-cancel-button @confirm='setGender'>
  <van-radio-group v-model="clickgender" direction="horizontal">
    <van-radio :name="1">男士</van-radio>
    <van-radio :name="0">女士</van-radio>
</van-radio-group>
 </van-dialog>
 <!-- 默认让裁剪框隐藏 -->
<div class="msk" v-show="mskShow">
  <van-button   @click='mskShow = false' class="start" color="#ccc" size="small" round >取消</van-button>
  <van-button  @click="crop" class="stop"  color="lime" size="small" round >保存</van-button>
  <VueCropper :img='img' ref='editImg' autoCrop autoCropWidth= '150' autoCropHeight='150' fiexd></VueCropper>
</div>
</div>
</template>
<script>
// 局部引入裁剪框
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      user: '',
      nickshow: false,
      passshow: false,
      gendershow: false,
      clickname: '',
      clickPass: '',
      clickgender: 1,
      mskShow: false,
      img: ''
    }
  },
  created() {
    // 设置钩子函数,渲染之前数据重定向
    this.getInfo()
  },
  methods: {
    async getInfo() {
      // 发送请求获取当前用户信息
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    // 简化编辑代码 封装一个函数,用形参来接受修改的值
    async setUserEdit(data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        this.getInfo()
        this.$toast.success('修改成功')
      }
    },
    async editNick() {
      this.nickshow = true
      // 定一个空对象,保存点击当前用户的信息,同时那这个clickname跟组件数据双向绑定
      this.clickname = this.user.nickname
      // 等待DOM更新
      await this.$nextTick()
      // 自动获取焦点
      this.$refs.editNick.focus()
    },
    setNick() {
      this.setUserEdit({
        nickname: this.clickname
      })
    },
    async editPass() {
      this.passshow = true
      this.clickPass = this.user.password
      // 等待DOM更新
      await this.$nextTick()
      // 获取焦点
      this.$refs.editPass.focus()
    },
    setPass() {
      this.setUserEdit({
        password: this.clickPass
      })
    },
    editGender() {
      this.gendershow = true
      this.clickgender = this.user.gender
    },
    setGender() {
      this.setUserEdit({
        gender: this.clickgender
      })
    },
    // 设置过滤图片格式的函数
    isImg(name) {
      if (name.endsWith('gif') || name.endsWith('png') || name.endsWith('jpeg') || name.endsWith('jpg')) {
        return true
      } else {
        return false
      }
    },
    // 上传头像
    async upFilesImg(file) {
      if (!this.isImg(file.file.name)) {
        return this.$toast('请上传正确格式的图片')
      }
      if (file.file.size >= 200 * 1024) {
        return this.$toast('文件体积过大')
      }
      // 点了头像后,让裁剪框显示出来
      this.mskShow = true
      // 设置裁剪的图片跟裁剪框保持一致
      this.img = file.content
    },
    crop() {
      this.$refs.editImg.getCropBlob(async blob => {
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.setUserEdit({
            head_img: data.url
          })
        }
        this.mskShow = false
      })
    }
    // 通过ajax上传文件,不能是一个普通对象,必须要是fromdata格式的
    // const fd = new FormData()
    // fd.append('file', file.file)
    // const res = await this.$axios.post('/upload/', fd)
    // const { statusCode, data } = res.data
    // if (statusCode === 200) {
    //   this.setUserEdit({
    //     head_img: data.url
    //   })
    // }
  }

}
</script>
<style lang='less' scoped>
.edit_img {
  position: relative;
  text-align: center;
  padding: 25px 0;
  img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .van-uploader{
   position: absolute;
   left: 50%;
   top: 20px;
   transform: translate(-50%);
   opacity: 0;

  }
}
// 深度选择器 由于scoped的存在,让每个组件中的模板都有一个特别的类名属性,但是不包括动态生成的
//也就是说我们给带有特殊类名的标签设置样式是不起作用的 因此需要=> 深度标签选择器
// css =>   >>>
// less => /deep/
.userDialog{
  padding: 0 10px;
}
.userField {
  border:1px solid  skyblue
}
 .hm_header{
  background: pink;
/deep/  .title{
    color: red
  }
}
.msk{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  background-color: #0000;
  .start{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
  }
  .stop{
    position: absolute;
    right: 0;
    top:0;
    z-index: 99;
  }
}
.vue-cropper{
  background-image:none;
  background-color: #000;
}

</style>
