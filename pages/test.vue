<template>
  <div>
    <h1>this is test page</h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  head() {
    return {
      title: '测试页面'
    }
  },
  beforeMount() {
    const wx = window.wx
    const url = window.location.href
    this.getWechatSignture(url).then(res => {
      const params = res.data
      wx.config(
        Object.assign(
          {
            debug: true,
            jsApiList: [
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'onMenuShareTimeline',
              'hideAllNonBaseMenuItem',
              'showMenuItems'
            ]
          },
          params
        )
      )
      wx.ready(() => {
        wx.hideAllNonBaseMenuItem()
        console.log('success')
      })
    })
  },
  methods: {
    ...mapActions('test', ['getWechatSignture'])
  }
}
</script>

<style>
</style>
