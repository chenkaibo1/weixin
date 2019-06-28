<template>
  <div class="container">
    <div class="user">
      <div class="user-header">
        <div class="user-header-text">{{authUser.nickname}}</div>
        <img :src="authUser.avatarUrl">
      </div>
      <div class="user-address">
        <cell title="收货地址" icon_name="place"></cell>
        <div class="user-content">{{authUser.address}}</div>
      </div>
      <div class="user-phone">
        <cell title="电话" icon_name="phone_iphone"></cell>
        <div class="user-content">{{authUser.phoneNumber}}</div>
      </div>
      <div class="user-name">
        <cell title="姓名" icon_name="accout_box"></cell>
        <div class="user-content">{{authUser.name}}</div>
      </div>
      <div class="user-order">
        <cell title="我的订单" icon_name="list"></cell>
        <div class="user-order-item" v-for="(item,index) in payments" :key="index">
          <img src alt>
          <div class="user-order-intro">
            <div class="title">{{item.product.title}}</div>
            <div class="content">{{ item.product.intro }}</div>
          </div>
          <div class="user-order-price">
            <span>¥{{item.product.price.toFixed(2)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cell from '~/components/cell.vue'
import { mapState } from 'vuex'

export default {
  // middleware: 'wechat-auth',
  head() {
    return {
      title: '个人中心'
    }
  },
  computed: {
    ...mapState('user', ['authUser', 'payments'])
  },
  methods: {},
  beforeCreate() {
    this.$store.dispatch('user/fetchPayments')
  },
  components: {
    cell
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/user';
</style>
