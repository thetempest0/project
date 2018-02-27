<template>
  <div>
    <el-row class="header-row" type="flex" align="center" justify="space-between">
      <el-col class='header-nav-col' :span="20">
        <jk-nav class='jk-nav' :items='items' :index="this.selectItem.index" @select="tabSelect"></jk-nav>
      </el-col>
      <section class="header-right">
        <el-input placeholder="资源类型" v-model="searchText" icon="search" :on-icon-click="handleIconClick"></el-input>
      </section>
    </el-row>
    <jk-resource :searchText="searchText" ref="resource"></jk-resource>
  </div>
</template>
<script>
  import * as api from '../../api/index'
  export default {
    components: {
      'jk-nav': require('../common/nav.vue'),
      'jk-resource': require('./resource.vue')
    },
    data () {
      return {
        items: [],
        selectItem: {
          index: ''
        },
        searchText: ''
      }
    },
    mounted () {
      this.getTabResouceData()
    },
    methods: {
      getTabResouceData () {
        this.items.splice(0, this.items.length)
        this.items.push({index: '', text: '所有'})
        api.console.getCategoryList().then((response) => {
          for (let item of response.data.data) {
            item.index = item.id.toString()
            item.text = item.name
            this.items.push(item)
          }
          if (this.items.length > 0) {
            this.selectItem = this.items[0]
            this.$nextTick(() => {
              this.$refs.resource.setData(this.selectItem)
            })
          }
        }, (response) => {
          this.$notify({
            title: 'tip',
            message: JSON.stringify(response),
            duration: 2000
          })
        })
      },
      tabSelect (tab) {
        this.selectItem = tab
        this.$refs.resource.setData(this.selectItem)
      },
      handleIconClick () {
        this.$refs.resource.setData(this.selectItem)
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
