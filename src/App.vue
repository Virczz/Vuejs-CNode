<template>
  <div id="app">
      <cnode-header></cnode-header>
      <router-view></router-view>
  </div>
</template>

<script>
import CnodeHeader from './components/CnodeHeader'
export default {
  data(){
    return {

    }
  },
  components:{
    CnodeHeader
  }
}
</script>

<style lang="less">
@import './assets/common.less';
</style>
