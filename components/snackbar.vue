<template>
  <transition name="swing">
    <div class="snacker" v-if="open">
      <div class="snacker-conetnt">
        <slot name="body"></slot>
        <slot name="action" @click="$emit('update:open', false)"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    open: function(newVal, oldVal) {
      if (newVal) {
        var timer = setTimeout(() => {
          this.$emit('update:open', false)
          clearTimeout(timer)
        }, 3 * 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/snackbar.scss';
</style>
