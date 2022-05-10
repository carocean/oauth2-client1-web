<template>
  <div>
    <button v-on:click="test">显示(第一步)</button>
    <button v-on:click="refreshToken">刷新token</button>
    <button v-on:click="clearToken">注意：先清除本地accessToken</button>
    <button v-on:click="logout">登出</button>
    <p>client1显示结果：{{ msg }}</p>
  </div>
</template>

<script>
import {getRequest} from "../utils/api";

export default {
  name: 'Home',
  mounted() {
    console.log("----mounted");
    this.test2();
  },
  data() {
    return {
      msg: '',
      accessToken:'',
    }
  },
  methods: {
    refreshToken(){
      let url='/client1/refresh_token';
      const refreshToken = localStorage.getItem("refresh_token");
      //可放入header中（Authorization:Bearer），也可放到参数中(?access_token=)
      if (refreshToken==null||refreshToken==''||typeof refreshToken=="undefined") {
        return;
      }
      url = url + '?refresh_token=' + refreshToken;
      //向后台请求令牌
      getRequest(url,{
        'Content-Type': 'application/json',
      }).then(resp => {
        console.log(resp.data);
        //alert('----' + resp.data.data);
        localStorage.setItem("access_token",resp.data.access_token);
        localStorage.setItem("refresh_token", resp.data.refresh_token);
        localStorage.setItem("token_type",resp.data.token_type);
        localStorage.setItem("expires_in",resp.data.expires_in);
      }).catch(function (reason) {
        console.log(reason);
      })
    },
    test() {
      let url='/client1/test';
      const accessToken = localStorage.getItem("access_token");
      //可放入header中（Authorization:Bearer），也可放到参数中(?access_token=)
      if (accessToken!=null&&accessToken!=''&&typeof accessToken!="undefined") {
        url = url + '?access_token=' + accessToken;
      }
      const the=this;
      getRequest(url,null,{
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization':'Bearer '+accessToken,
      }).then(resp => {
        console.log('---s---' + resp.data.data);
        //alert('----' + resp.data.data);
        if (resp.data.code === 0) {
          this.msg = resp.data.data
        } else if (resp.data.code === 800) {
          window.location.href = resp.data.data
        } else if (resp.data.code === 801) {//token异常：或者是过期了或是非法，总之需要刷新token
          console.log('刷新token');
          the.refreshToken();
        } else {
          console.log('失败：' + resp.data)
        }
      }).catch(function (reason) {
        console.log(reason);
      });
    },
    test2() {

      let code = this.$route.query.code;
      console.log('------' + code);
      const the=this;
      if (typeof code != 'undefined' && code != '' && code != null) {
        //向后台请求令牌
        getRequest('/client1/token?code=' + code,{
          'Content-Type': 'application/json',
        }).then(resp => {
          console.log('---get---' + resp.data);
          //alert('----' + resp.data.data);
          localStorage.setItem("access_token",resp.data.access_token);
          localStorage.setItem("refresh_token", resp.data.refresh_token);
          localStorage.setItem("token_type",resp.data.token_type);
          localStorage.setItem("expires_in",resp.data.expires_in);
        }).catch(function (reason) {
          console.log(reason);
        })
      }
    },
    clearToken(){
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token_type");
      localStorage.removeItem("expires_in");
    },
    logout(){
      let url='/client1/logout';
      const accessToken = localStorage.getItem("access_token");
      //可放入header中（Authorization:Bearer），也可放到参数中(?access_token=)
      if (accessToken!=null&&accessToken!=''&&typeof accessToken!="undefined") {
        url = url + '?access_token=' + accessToken;
      }
      const the=this;
      getRequest(url,null,{
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization':'Bearer '+accessToken,
      }).then(resp => {
        console.log( resp.data);
        this.clearToken();
      }).catch(function (reason) {
        console.log(reason);
      });
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
