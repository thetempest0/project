<template>
  <div>
    <el-row class="header-row" type="flex" justify="space-between">
      <el-col class='header-nav-col' :span="20">
        <jk-nav :items='items' :index='currentView' @select="tabSelect"></jk-nav>
      </el-col>
      <section class="header-right">
        <el-input class="header-right-item" v-model="searchText" placeholder="资源类型" icon="search"
                  :on-icon-click="handleIconClick"></el-input>
      </section>
    </el-row>
    <component v-bind:is="currentView" :searchText='searchText' ref='cmpt'>
    </component>
  </div>
</template>
<script>
  export default {
    components: {
      'jk-nav': require('../common/nav.vue'),
      'jk-borrow': require('./borrow.vue'),
      'jk-credit': require('./credit.vue')
    },
    data () {
      return {
        currentView: 'jk-borrow',
        isProgress: true,
        searchText: '',
        items: [
          {
            index: 'jk-credit',
            text: '借出的资源'
          },
          {
            index: 'jk-borrow',
            text: '借用的资源'
          }
        ]
      }
    },
    methods: {
      tabSelect (tab) {
        this.currentView = tab.index
      },
      handleIconClick () {
        this.$refs.cmpt.setData(this.selectItem)
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
