<template>
  <div id="app">
    <div id="main">
      <nuxt/>
    </div>
    <v-nav/>
  </div>
</template>

<script>
import vNav from '~/components/nav'

export default {
  components: {
    vNav
  }
}
</script>