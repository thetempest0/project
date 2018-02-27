<template>
  <el-dialog :title="title" v-model="visible" @close='close'>
    <section class="dialog-body">
      <el-row type="flex" justify="center" align="center">
        <el-col :span="3" class="vertical-center">
          <div class="">资源类型：</div>
        </el-col>
        <el-col :span="4" class="vertical-center">
          <span>{{model.category}}</span>
        </el-col>
        <el-col :span="4" class="vertical-center">
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
        <el-button v-if='refuseDisabled' @click="refuse">拒绝</el-button>
        <el-button @click="confirm">批准</el-button>
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
        title: '借用申请',
        visible: false,
        srcData: null,
        refuseDisabled: false,
        model: {
          category: '',
          type: '',
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
        this.refuseDisabled = false
        this.model.category = row.resourcesCategoryName
        this.model.type = row.resourcesTypeName
        this.model.number = row.updateNum
        this.model.remark = row.remark
        this.visible = true
        switch (row.status) {
          case '1':
            this.title = `入场申报 (${row.supplierName})`
            this.refuseDisabled = true
            break
          case '3':
            this.title = `资源变更 (${row.supplierName})`
            break
          case '4':
            this.title = `资源撤场 (${row.supplierName})`
            break
        }
      },
      close () {
        this.srcData = null
        this.model.category = ''
        this.model.type = ''
        this.model.number = 0
        this.model.remark = ''
        this.visible = false
      },
      confirm () {
        const resource = this.srcData
        let parm = null
        switch (resource.status) {
          case '1':
            parm = {
              resourcesId: resource.resourcesId,
              initNum: resource.num
            }
            api.resourceShare.checkResourcesAdmission(parm)
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
            break
          case '3':
            parm = {
              resourcesId: resource.resourcesId,
              inventoryNum: resource.num
            }
            api.resourceShare.checkResourcesInventory(parm)
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
                }
              }, response => {
                console.error(response)
              })
              .catch(error => {
                console.error(error)
              })
            break
          case '4':
            parm = {
              resourcesId: resource.resourcesId,
              evacuateNum: resource.num
            }
            api.resourceShare.checkResourcesEvacuate(parm)
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
                }
              }, response => {
                console.error(response)
              })
              .catch(error => {
                console.error(error)
              })
            break
        }
      },
      refuse () {
        const resource = this.srcData
        let parm = {resourcesId: resource.resourcesId}
        api.resourceShare.resourcesAdmissionRefuse(parm)
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
            }
          }, response => {
            console.error(response)
          })
          .catch(error => {
            console.error(error)
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
    width: 9rem
  }
</style>
