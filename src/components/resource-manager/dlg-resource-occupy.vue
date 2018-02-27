<!--占用-->
<template>
  <el-dialog v-model="visible" title="占用" size="tiny" style="width: 120rem" @close='close'>
    <section class="dialog-body">
      <el-row type="flex" justify="center" align="center">
        <el-col :span="3" class="vertical-center">
          <div class="">占用量：</div>
        </el-col>
        <el-col :span="9" class="vertical-center">
          <el-input-number class="small-input" :min="1" :max="model.maxOccupyNum"
                           v-model="model.occupyNum"></el-input-number>
        </el-col>
      </el-row>
    </section>
    <hr>
    <el-row justify="end">
      <el-col :span="24">
        <section class="dialog-footer">
          <el-button @click="confirm">确定</el-button>
        </section>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
  import storage from '../../module/storage'
  import * as api from './../../api'
  export default {
    components: {},
    data () {
      return {
        visible: false,
        rowParam: {},
        model: {
          maxOccupyNum: 1,
          occupyNum: 1
        }
      }
    },
    mounted () {
    },
    methods: {
      show (row, store) {
        this.rowParam = row
        this.model.maxOccupyNum = parseInt(row.num)
        this.visible = true
      },
      close () {
        this.model.occupyNum = 1
        this.visible = false
      },
      confirm () {
        let param = {
          userId: storage.getUser().userId,
          selfNum: this.model.occupyNum,
          resourcesId: this.rowParam.resourcesId
        }
        api.resourceManage.resourcesSelf(param).then((response) => {
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
        }, (response) => {
          console.error(response)
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
</style>
