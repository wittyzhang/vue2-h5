<template>
  <div class="about-container">
    <!-- <img class="top-img" src="https://flashcash.gh.loancloudgh.net/collection/assets/Group_46.e3305248.svg" /> -->
    <div class="locales-btn" @click="changeLocales">{{ lang === 'en' ? 'en' : '中文' }}</div>
    <div class="logo-warpper">
      <img class="logo" src="../../assets/img/logo.png" />
      <!-- <div class="title">{{ $lang('借款平台') }}</div> -->
    </div>
    <div class="login-warpper">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="account"
            :name="$lang('账号')"
            :label="$lang('账号')"
            :placeholder="$lang('账号')"
            :rules="[{ required: true, message: $lang('请输入账号') }]"
          />
          <van-field
            v-model="password"
            type="password"
            :name="$lang('密码')"
            :label="$lang('密码')"
            :placeholder="$lang('密码')"
            :rules="[{ required: true, message: $lang('请输入密码') }]"
          />
        </van-cell-group>
        <div style="margin-top: 81px">
          <van-button round block type="primary" native-type="submit"> {{ $lang('提交') }} </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
// 请求接口
// import { getUserInfo } from '@/api/module/user.js'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      account: '',
      password: '',
      lang: 'en'
    }
  },
  mounted() {
    this.lang = localStorage.getItem('language')
  },
  computed: {
    ...mapState(['roles'])
  },
  methods: {
    ...mapActions(['_login', '_reset']),
    async onSubmit(values) {
      console.log('submit', values)
      try {
        await this._login({ account: this.account, password: this.password })
      } catch (error) {
        console.log(error)
      }
    },
    changeLocales() {
      const lang = this.lang === 'en' ? 'zh' : 'en'
      this.lang = lang
      this.$setLocales(lang)
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">
.about-container {
  /* 你的命名空间 */
  // background: ('/assets/logo.png');
  background: url('../../assets/img/loginbg.png') no-repeat;
  background-size: 100% auto;
  height: 100vh;
  box-sizing: border-box;
  .locales-btn {
    border: 1px solid #cccccc;
    font-size: 12px;
    border-radius: 10px;
    padding: 8px 10px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .logo-warpper {
    text-align: center;
    margin: 0 auto;
    padding-top: 87px;
    .logo {
      width: 142px;
      height: auto;
    }
    .title {
      font-size: 7vw;
      color: #fff;
      margin-top: 50px;
    }
  }
  .login-warpper {
    padding: 50px 15px 43px 15px;
    width: 330px;
    margin: 23px auto;
    background: #ffffff;
    border-radius: 18px;
    box-sizing: border-box;
  }
}
</style>
