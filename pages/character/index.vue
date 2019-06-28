<template>
  <div class="container">
    <div class="focusCharacters-header">
      <img alt class="focusCharacters-header-bg" v-if="focusCharacter.images">
      <div class="focusCharacters-media">
        <img :src="focusCharacter.img" alt v-if="focusCharacter.profile">
        <div class="focusCharacters-text">
          <div class="names">
            <p class="cname" style="color:black">{{focusCharacter.cname}}</p>
            <p class="name" style="color:black">{{focusCharacter.name}}</p>
          </div>
          <span class="born">{{focusCharacter.nmId}}</span>
        </div>
      </div>
    </div>
    <div class="focusCharacters-body">
      <div class="focusCharacters-intro">
        <p v-for="(item, index) in focusCharacter.intro" :key="index">{{item}}</p>
      </div>
      <div class="focusCharacter-stills">
        <img :src="item" alt v-for="(item, index) in focusCharacter.images" :key="index">
      </div>
      <div
        class="focusCharacter-item"
        v-for="(item, index) in focusCharacter.sections"
        :key="index"
      >
        <div class="focusCharacter-item-title">{{item.title}}</div>
        <div class="focusCharacter-item-body" v-for="(text, k) in item.content" :key="k">{{text}}</div>
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
      title: '家族成员详情'
    }
  },
  computed: {
    ...mapState('character', ['focusCharacter'])
  },
  beforeCreate() {
    const id = this.$route.query.id
    this.$store.dispatch('character/focusCharacter', id)
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/characters.scss';
</style>
