<template>
  <div>
    <button v-on:click="test">显示</button>
    <p>client1显示结果：{{msg}}</p>
  </div>
</template>

<script>
  import {getRequest} from "../utils/api";

  export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    test() {
      getRequest('/client1/test').then(resp=>{
        if (resp.data.code === 0) {
          this.msg = resp.data.data
        }else if (resp.data.code === 800) {
          window.location.href = resp.data.data
        } else {
          console.log('失败：'+resp.data)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
