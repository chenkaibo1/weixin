<template>
  <div class="container">
    <div class="focusHouse-media">
      <img src v-if="focusHouse.cname">
      <div class="focusHouse-text">
        <div class="words">{{focusHouse.words}}</div>
        <div class="name">{{focusHouse.name}}</div>
      </div>
    </div>
    <div class="focusHouse-body">
      <div class="focusHouse-item-title">{{focusHouse.cname}}</div>
      <div class="focusHouse-item-body">{{focusHouse.intro}}</div>
      <div class="focusHouse-item-title">主要角色</div>
      <div
        class="focusHouse-item-body"
        v-for="(item, index) in focusHouse.swornMembers"
        :key="index"
      >
        <div class="swornMembers">
          <img :src="item.img">
          <div class="swornMembers-body">
            <div class="name">{{item.character.cname}}</div>
            <div class="introduction">{{item.text}}</div>
          </div>
        </div>
      </div>
      <div
        class="focusHouse-item-section"
        v-for="(item, index) in focusHouse.sections"
        :key="index"
      >
        <div class="focusHouse-item-title">{{item.title}}</div>
        <div class="focusHouse-item-body" v-for="(text, k) in item.content" :key="k">{{text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'auth',
  transition: {
    name: 'slide-left'
  },
  head() {
    return {
      title: '家族详情'
    }
  },
  computed: {
    ...mapState('house', ['focusHouse'])
  },
  beforeCreate() {
    const id = this.$route.query.id
    this.$store.dispatch('house/focusHouse', id)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/house.scss';
</style>

