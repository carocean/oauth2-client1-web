<template>
  <div>
    <p>账号：</p>
    <input type="text" v-model="loginForm.username">
    <p>密码：</p>
    <input type="password" v-model="loginForm.password">
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
          password: ''
        }
      }
    },
    methods: {
      login() {
        postRequest('/auth/login', this.loginForm).then(resp => {
          if (resp.data.code === 0) {
            var pageUrl = window.location.href
            var param = pageUrl.split('?')[1]
            window.location.href = '/oauth/authorize?'+param
          } else {
            console.log('登录失败：'+resp.data.msg)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
