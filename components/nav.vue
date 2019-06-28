<template>
  <div id="nav">
    <nuxt-link v-for="(item, index) in navList" :key="index" :to="item.path">
      <div v-if="index === 0">
        <img v-if="activeRoute !== item.name" src="/web/home.png">
        <img v-else src="/web/home-selected.png">
      </div>
      <div v-else-if="index ===1">
        <img v-if="activeRoute !== item.name" src="/web/shopping.png">
        <img v-else src="/web/shopping-selected.png">
      </div>
      <div v-else>
        <img v-if="activeRoute !== item.name" src="/web/user.png">
        <img v-else src="/web/user-selected.png">
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          path: '/',
          name: 'index',
          text: '冰火脸谱'
        },
        {
          path: '/shopping',
          name: 'shopping',
          text: '周边手办'
        },
        {
          path: '/user',
          name: 'user',
          text: '个人中心'
        }
      ]
    }
  },
  computed: {
    activeRoute() {
      return this.$route.name
    },
    navVisible() {
      return ['index', 'shopping', 'user'].indexOf(this.activeRoute) > -1
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/nav.scss';
</style>
