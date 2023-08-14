<template>
  <div>
    <van-nav-bar :title="title" :left-text="$lang('返回')" left-arrow @click-left="onClickLeft">
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    }
  },
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      // this.$router.go(-1)
      this.$emit('goBack')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navBarBtn {
  color: #ffffff;
}
</style>
