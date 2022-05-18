<template>
  <div>
    <p>账号：</p>
    <input type="text" v-model="loginForm.username">
    <p>密码：</p>
    <input type="password" v-model="loginForm.password">
    <p>认证方式：</p>
    <input type="radio" name="auth_mode" id="authorization_code" v-model="grantType"
           value="authorization_code" @change="selectRadio" checked><label
    for="authorization_code">授权码</label>
    <input type="radio" name="auth_mode" id="implicit" v-model="grantType" value="implicit"
           @change="selectRadio"><label for="implicit">简化</label>
    <input type="radio" name="auth_mode" id="sms_code" v-model="grantType" value="sms_code"
           @change="selectRadio"><label for="sms_code">手机验证码</label>
    <p></p>
    <button v-on:click="login">登录</button>
  </div>
</template>

<script>
import {postRequest} from "../utils/api";

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      grantType: 'authorization_code',
    }
  },
  methods: {
    selectRadio() {

    },
    login() {
      let url = '/auth/login';
      switch (this.grantType) {
        case "authorization_code":
          url += '?response_type=code';
          break;
        case "implicit":
          url += '?response_type=token';
          break;
        case "sms_code":
          url += '?grant_type=sms_code';
          break;
      }
      postRequest(url, this.loginForm).then(resp => {
        if (resp.data.code === '2030') {
          let data = resp.data.data;
          var pageUrl = window.location.href
          var param = pageUrl.split('?')[1]
          console.log('------e-----');
          let redirect ='';
          if(data.indexOf('grant_type')>-1){//提交到client1后台，让应用自行到认证服务器后台的/oauth/token拿令牌，拿到后自行跳转或交由认证服务器跳转
            redirect = '/client1/token/sms_code?' + data +'&mobile='+this.loginForm.username+'&sms_code='+this.loginForm.password+ '&' + param;
          }else{
            redirect = '/auth/oauth/authorize?' + data + '&' + param;
          }
          // alert(redirect);
          window.location.href = redirect;
        } else {
          console.log('登录失败：' + resp.data.message)
          alert('登录失败：' + resp.data.code + ' ' + resp.data.message)
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
