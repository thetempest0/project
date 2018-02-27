<template>
  <div>
    <el-row class="header-row">
      <el-col class='header-nav-col' :span="24">
        <jk-nav :items='items' :index='currentView' @select="tabSelect"></jk-nav>
      </el-col>
    </el-row>
    <component v-bind:is="currentView">
    </component>
  </div>
</template>
<script>
  export default {
    components: {
      'jk-nav': require('../common/nav.vue'),
      'jk-supplier': require('./supplier.vue'),
      'jk-supplier-category': require('./supplier-category.vue'),
      'jk-supplier-resource-type': require('./supplier-resource-type.vue'),
      'jk-supplier-resource-category': require('./supplier-resource-category.vue'),
      'jk-unit': require('./unit.vue')
    },
    data () {
      return {
        currentView: 'jk-supplier',
        items: [
          {
            index: 'jk-supplier',
            text: '供应商'
          },
          {
            index: 'jk-supplier-category',
            text: '供应商类型'
          },
          {
            index: 'jk-supplier-resource-type',
            text: '资源类型'
          },
          {
            index: 'jk-supplier-resource-category',
            text: '资源类别'
          },
          {
            index: 'jk-unit',
            text: '单位'
          }
        ]
      }
    },
    mounted () {
    },
    methods: {
      tabSelect (tab) {
        this.currentView = tab.index
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
