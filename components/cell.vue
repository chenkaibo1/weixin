<template>
  <div class="cell">
    <span>{{title}}</span>
    <span v-if="content && !iconName">{{content}}</span>
    <i class="material-icon" v-else>{{iconName}}</i>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    iconame: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/color';
@import '~assets/scss/mixin';

.cell {
  width: 100%;
  font-size: 0;

  > * {
    vertical-align: middle;
    display: inline-block;
  }

  span {
    width: 50%;
    text-align: left;
    @include font-dpr(15px);
  }

  .material-icon {
    width: 50%;
    text-align: right;
    @include font-dpr(33px);
    color: $grey-800;
  }
}
</style>
