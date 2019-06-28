<template>
  <div class="container">
    <div class="shopping">
      <div class="shopping-title">权游周边</div>
      <div class="shopping-list">
        <div class="shopping-item" v-for="(item,index) in products" :key="index">
          <img src alt>
          <div class="shopping-item-body">
            <div class="title">{{item.title}}</div>
            <div class="content">{{item.intro}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'auth',
  head() {
    return {
      title: '周边手办'
    }
  },
  computed: {
    ...mapState('shopping', ['products', 'shoppingScroll'])
  },
  beforeCreate() {
    this.$store.dispatch('shopping/fetchProducts')
  },
  mounted() {
    // 滚动条滚动至上次离开前的位置
    setTimeout(() => {
      this.$el.scrollTop = this.shoppingScroll
    }, 50)
  },
  beforeDestroy() {
    // 离开前保存滚动条位置
    this.$store.commit('shopping/SET_SHOPPING_SCROLL', this.$el.scrollTop)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/shopping';
</style>
