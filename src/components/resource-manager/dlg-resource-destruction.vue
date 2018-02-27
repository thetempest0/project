<!--删除-->
<template>
  <el-dialog v-model="visible" title="删除" @close="close">
    <h1 style="text-align: center">确定要删除资源？</h1>
    <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
  import * as api from './../../api'
  export default {
    components: {},
    data () {
      return {
        visible: false,
        rowParam: {}
      }
    },
    mounted () {
    },
    methods: {
      show (index, row, store) {
        this.rowParam = row
        this.visible = true
      },
      close () {
        this.visible = false
        this.rowParam = null
      },
      confirm () {
        let params = {resourceId: this.rowParam.resourcesId}
        api.resourceManage.delResources(params).then((response) => {
          const data = response.data
          if (data.meta.code === 100000) {
            this.$notify({
              title: 'tip',
              message: '操作成功',
              duration: 2000
            })
            this.$emit('callback')
            this.close()
          } else {
            this.notify('error', data.meta.code)
          }
        }).finally(() => {
        })
      },
      notify (type, message) {
        this.$notify({
          title: 'tip',
          message: message,
          type: type,
          duration: 2000
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .small-input {
    width: 16.1rem;
  }

  .middle-input {
    width: 43.9888rem;
  }
</style>
