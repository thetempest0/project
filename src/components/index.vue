<template>
  <div>
    <jk-header></jk-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  export default {
    components: {
      'jk-header': require('./header.vue')
    },
    data () {
      return {
        dialogVisible: false
      }
    },
    mounted () {
    },
    methods: {}
  }
</script>
<style scoped lang="scss">
</style>
