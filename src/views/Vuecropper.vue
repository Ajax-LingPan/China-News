<template>
<div class="vue_cropper">
 <VueCropper
  autoCrop
  autoCropWidth="100"
  autoCropHeight="100"
  fixed
  img="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3344988799,3949158950&fm=26&gp=0.jpg">
 </VueCropper>
 <!-- <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3344988799,3949158950&fm=26&gp=0.jpg" alt=""> -->
</div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  }
}
</script>

<style lang='less'>
.vue_cropper {
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>
