<template>
  <el-dialog :title="title" v-model="visible" @close='close'>
    <section class="dialog-body">
      <el-row type="flex" justify="center" align="center">
        <el-col :span="3" class="vertical-center">
          <div class="">借用日期：</div>
        </el-col>
        <el-col :span="8" class="vertical-center">
          <el-date-picker
              disabled
              v-model="model.borrowDateTime"
              type="date"
              placeholder="选择日期范围">
          </el-date-picker>
        </el-col>
        <el-col :span="3" class="vertical-center">
          <div class="">归还日期：</div>
        </el-col>
        <el-col :span="8" class="vertical-center">
          <el-date-picker
              v-model="model.returnDateTime"
              type="date"
              placeholder="选择日期范围">
          </el-date-picker>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" align="center">
        <el-col :span="3" class="vertical-center">
          <div class="">资源类型：</div>
        </el-col>
        <el-col :span="8" class="vertical-center">
          <span>{{model.type}}</span>
        </el-col>
        <el-col :span="3" class="vertical-center">
          <div class="">数量（台）：</div>
        </el-col>
        <el-col :span="8" class="vertical-center">
          <el-input-number class="small-input" disabled v-model="model.number"></el-input-number>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" align="center">
        <el-col :span="3">
          <div>备注说明：</div>
        </el-col>
        <el-col :span="19" class="vertical-center">
          <el-input disabled class="middle-input" v-model="model.remark" placeholder=""></el-input>
        </el-col>
      </el-row>

    </section>
    <hr>
    <el-row>
      <section class="dialog-footer">
        <el-button @click="confirm">接收</el-button>
      </section>
    </el-row>
  </el-dialog>
</template>
<script>
  import * as api from '../../api/index'
  export default {
    components: {},
    data () {
      return {
        title: '归还确认',
        visible: false,
        srcData: null,
        model: {
          type: '',
          borrowDateTime: '',
          returnDateTime: '',
          number: 0,
          remark: ''
        }
      }
    },
    mounted () {
    },
    methods: {
      show (row) {
        this.srcData = row
        this.title = `归还确认 (${row.supplierName})`
        this.model.type = row.typeName
        this.model.borrowDateTime = row.borrowDateTime
        this.model.returnDateTime = row.returnDateTime
        this.model.number = row.operatRecordNum
        this.model.remark = row.remark
        this.visible = true
      },
      close () {
        this.srcData = null
        this.model.type = ''
        this.model.borrowDateTime = ''
        this.model.returnDateTime = ''
        this.model.number = 0
        this.model.remark = ''
        this.visible = false
      },
      confirm () {
        const resource = this.srcData
        const model = this.model
        if (!this.checkError(model)) {
          return
        }
        api.resourceShare.checkReturn(resource.id, this.model.number, this.model.returnDateTime)
          .then(response => {
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
          }, response => {
            console.error(response)
          })
          .catch(error => {
            console.error(error)
          })
      },
      checkError (model) {
        if (!model.borrowDateTime) {
          this.$notify({
            title: 'tip',
            message: '请填入借用日期',
            duration: 2000
          })
          return false
        }
        if (!model.returnDateTime) {
          this.$notify({
            title: 'tip',
            message: '请填入归还日期',
            duration: 2000
          })
          return false
        }
        if (model.number === 0) {
          this.$notify({
            title: 'tip',
            message: '借用数量不能为0',
            duration: 2000
          })
          return false
        }
        const dtBorrow = new Date(model.borrowDateTime)
        const dtReturn = new Date(model.returnDateTime)
        if (dtReturn.getTime() < dtBorrow.getTime()) {
          this.$notify({
            title: 'tip',
            message: '归还日期不能早于借出日期',
            duration: 2000
          })
          return false
        }
        return true
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
    width: 9rem
  }
</style>
