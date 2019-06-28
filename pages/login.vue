<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="card-inner">登录</div>
      </div>
      <div class="card-body">
        <div class="form">
          <input type="text" class="form-control" v-model="user.email">
          <input type="password" class="form-control" v-model="user.password">
          <button class="btn login-btn" @click="login">登录</button>
        </div>
      </div>
    </div>
    <v-snackbar :open.sync="openSnackbar">
      <span slot="body">请输入账号和密码</span>
    </v-snackbar>
  </div>
</template>
<script>
import vSnackbar from '~/components/snackbar'

export default {
  data() {
    return {
      openSnackbar: false,
      user: {}
    }
  },

  methods: {
    async login() {
      const { email, password } = this.user

      if (!email || !password) {
        this.openSnackbar = true
        return ''
      }

      const res = await this.$store.dispatch('user/login', this.user)

      if (!res.ret) this.$router.push('/admin')
    }
  },

  components: {
    vSnackbar
  }
}
</script>

<style scoped, lang="scss">
</style>
