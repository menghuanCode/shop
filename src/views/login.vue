<template>
  <div class="login-box">
    <div class="logo">
      <img src="../assets/images/logo.png" alt />
    </div>
    <div class="loginform">
      <div class="loginform-line">
        <van-field v-model="sms"  placeholder="手机号" class="loginform-cell">
          <van-button slot="button" size="small" type="primary">获取验证码</van-button>
        </van-field>
      </div>
      <div class="loginform-line">
        <van-field v-model="value" placeholder="验证码" class="loginform-cell" />
      </div>
      <div class="loginform-msg">
        新用户登录即自动注册，并表示已同意
        <a
          class="loginform-link"
          href="//h5.ele.me/service/agreement/#initTitle=%E7%94%A8%E6%88%B7%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE&amp;key=ruleQue18"
        >《用户服务协议》</a>和
        <a
          class="loginform-link"
          href="http://terms.alicdn.com/legal-agreement/terms/suit_bu1_other/suit_bu1_other201903051859_43484.html"
        >《隐私权政策》</a>
      </div>
      <button class="submit-button">登录</button>
      <a href="javascript:;" class="login-more">关于我们</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      sms: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  height: auto;
  min-height: 100%;
  padding-top: 40px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}

.login-more {
  display: block;
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
  color: #999;
}

.logo {
  height: 56px;
  text-align: center;
}

.loginform {
  margin-top: 16px;
  &-msg {
    margin-top: 16px;
    font-size: 14px;
    line-height: 24px;
    color: #999;
  }
  &-link {
    color: #2395ff;
    padding: 0 5px;
  }
  &-cell {
    border: 1px solid #ddd;
    margin-bottom: 16px;
    border-radius: 4px;
    &--focus {
      border-color: #0089dc;
    }
  }
}

.submit-button {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 30px;
  border-radius: 4px;
  background: #4cd96f;
  color: #fff;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
  outline: none;
  border: none;
}
</style>