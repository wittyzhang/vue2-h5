<template>
  <div class="index-container">
    <section class="top-warpper">
      <div class="logobox">
        <div class="flex5">
          <img class="logo" src="../../assets/img/logo.png" />
        </div>
        <div class="flex1"></div>
        <div class="flex5 txtRight">
          <van-button type="primary" size="mini" @click="loginOut" class="exitBtn"
            ><img src="../../assets/img/exit.png"
          /></van-button>
        </div>
      </div>
      <div class="userInfo">{{ `Hello, ${userName}!` }}</div>
      <div class="tip">{{ $lang('Welcome to LoanLine collection platform') }}</div>
    </section>
    <section class="total-box">
     
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      userName: ''
    }
  },
  mounted() {
    console.log(this.$store.getters)
    this.userName = this.$store.getters.userInfo.username
  },
  methods: {
    loginOut() {
      this.$store.dispatch('_loginOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.index-container {
  // background: url('https://flashcash.gh.loancloudgh.net/collection/assets/Group_46.e3305248.svg') no-repeat #fff;
  background-size: 100% auto;
  .top-warpper {
    margin: 0 auto;
    padding: 25px 20px 0;
    font-size: 28px;
    background: $primary-color;
    background-size: cover;
    height: 214px;
    border-radius: 0 0 40px 40px;
    .logobox {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      .flex5 {
        flex: 2 1 0%;
        text-align: center;
        margin-right: 5px;
      }
      .flex1 {
        flex: 1;
        text-align: center;
        margin-right: 5px;
        span {
          background: $primary-color;
          color: #ffffff;
          border-radius: 32px;
          white-space: nowrap;
          font-size: 12px;
          padding: 10px 15px;
        }
      }
      .logo {
        width: 100%;
        display: grid;
        height: auto;
      }
      .txtRight {
        text-align: right;
      }
      .exitBtn {
        width: 33px;
        height: 33px;
        img {
          width: 100%;
        }
      }
    }
    .tip {
      font-size: 15px;
      margin-top: 7px;
      margin-left: 10px;
      color: rgba(255, 255, 255, 0.5);
    }
    .userInfo {
      color: rgba(255, 255, 255, 0.85);
      font-size: 22px;
      margin-left: 10px;
      margin-top: 40px;
    }
  }
  .total-box {
    background: #ffffff;
    border-radius: 12px;
    width: 90%;
    // box-shadow: 0 3px 15px #ccc;
    // -webkit-box-shadow: 0 3px 15px #ccc;
    margin: -80px auto 20px auto;
    text-align: center;
    box-sizing: border-box;
    padding-top: 25px;
    .value {
      font-size: 20px;
      margin-bottom: 3px;
      font-weight: 700;
    }
    .text {
      font-size: 12px;
      margin-bottom: 20px;
      color: $gray-color;
    }
  }
  .van-cell-group {
    margin-bottom: 30px;
    // box-shadow: 0 3px 15px #ccc;
    // -webkit-box-shadow: 0 3px 15px #ccc;
  }
}
</style>
