<template>
  <div>
    <el-row class="header-row" type="flex" justify="space-between">
      <el-col class='header-nav-col' :span="20">
        <jk-nav :items='items' :index='this.selectItem.index' @select="tabSelect"></jk-nav>
      </el-col>
      <section class="header-right">
        <!--<el-checkbox v-model="pendingAudit"><strong>仅显示待审核</strong></el-checkbox>-->
        <el-input v-model="searchKeywords" class="header-right-item" placeholder="资源类型"
                  icon="search" :on-icon-click="handleIconClick"></el-input>
        <el-button v-if="user.type === 2" class="header-right-item" @click="entranceClick">入场登记</el-button>
      </section>
    </el-row>
    <component v-bind:is="currentCmpt"
               :onlyPaddingAudit="pendingAudit"
               :resourceTypeName="searchKeywords"
               ref="currentCmptRef"></component>
    <jk-entrance ref="entranceMessage" @callback='handleIconClick'></jk-entrance>
  </div>
</template>
<style lang='scss' scoped>
</style>
<script>
  import storage from '../../module/storage'
  import * as api from './../../api'
  export default {
    components: {
      'jk-nav': require('../common/nav.vue'),
      'jk-supplier': require('./supplier.vue'),
      'jk-manager': require('./manager.vue'),
      'jk-entrance': require('./dlg-resource-entrance.vue')
    },
    data () {
      return {
        currentCmpt: '',
        currentNav: '',
        user: {},
        pendingAudit: false,
        searchKeywords: '',
        items: [],
        selectItem: {index: ''}
      }
    },
    mounted () {
      this.initUserInfo()
      this.getTabResouceData()
    },
    methods: {
      // 切换标签查找
      tabSelect (tab) {
        this.selectItem = tab
        this.$refs.currentCmptRef.setData(this.selectItem)
      },
      // 输入关键字查找
      handleIconClick () {
        this.$refs.currentCmptRef.setData(this.selectItem)
      },
      // 添加资源
      entranceClick () {
        this.$refs.entranceMessage.show()
      },
      initUserInfo () {
        this.user = storage.getUser()
        switch (this.user.type) {
          case 1:
            this.currentCmpt = 'jk-manager'
            break
          default:
            this.currentCmpt = 'jk-supplier'
            break
        }
      },
      // 获取资源类型，初始化标签栏
      getTabResouceData () {
        this.items.splice(0, this.items.length)
        this.items.push({text: '所有', index: ''})
        api.console.getCategoryList().then((response) => {
          for (let item of response.data.data) {
            item.index = item.id.toString()
            item.text = item.name
            this.items.push(item)
          }
          if (this.items.length > 0) {
            this.selectItem = this.items[0]
            this.$nextTick(() => {
              this.$refs.currentCmptRef.setData(this.selectItem)
            })
          }
        }, (response) => {
          this.$notify({title: 'tip', message: JSON.stringify(response), duration: 2000})
        })
      }
    }
  }
</script>
