<!--变更-->
<template>
  <el-dialog v-model="visible" :title="title" @click="close">
    <section class="dialog-body">

      <el-row type="flex" justify="center" align="center">
        <!--类别-->
        <el-col :span="4" class="vertical-center">
          <div class="">资源类型：</div>
        </el-col>
        <el-col :span="4" class="vertical-center">
          <span>{{model.resourcesCategoryName}}</span>
        </el-col>
        <el-col :span="4" class="vertical-center">
          <span>{{model.resourcesTypeName}}</span>
        </el-col>
        <!--类型-->
        <el-col :span="4" class="vertical-center">
          <div class="">数量(台)：</div>
        </el-col>
        <el-col :span="6" class="vertical-center">
          <template>
            <el-input-number class="small-input" :min="1" v-model="model.number"></el-input-number>
          </template>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" align="center">
        <el-col :span="4">
          <div>备注说明：</div>
        </el-col>
        <el-col :span="18" class="vertical-center">
          <!--<el-input class="middle-input" placeholder="请输入备注说明" v-model="model.remark"></el-input>-->
          <span>{{model.remark}}</span>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" align="center">
        <el-col :span="24">
          <jk-upload ref='upload'></jk-upload>
        </el-col>
      </el-row>
    </section>

    <hr>

    <el-row justify="end">
      <el-col :span="24">
        <section class="dialog-footer">
          <el-checkbox class="button-margin" v-model="model.checkCancel" @change="model.checkChange">资源撤场</el-checkbox>
          <el-button class="button-margin" @click="close">取消</el-button>
          <el-button class="button-margin" @click="confirm">申请</el-button>
        </section>
      </el-col>
    </el-row>

  </el-dialog>
</template>
<script>
  import * as api from './../../api'
  export default {
    components: {
      'jk-upload': require('../common/upload.vue')
    },
    data () {
      return {
        title: '变更',
        visible: false,
        paramRow: {},
        model: {
          remark: '',
          number: 0,
          resourcesCategoryName: '',
          resourcesTypeName: '',
          resourcesId: '',
          checkCancel: false,
          checkChange: () => {
            if (this.model.checkCancel) {
              this.title = '资源撤场'
            }
          }
        }
      }
    },
    mounted () {
    },
    methods: {
      show (row, store) {
        this.visible = true
        this.model.resourcesCategoryName = row.resourcesCategoryName
        this.model.resourcesTypeName = row.resourcesTypeName
        this.model.remark = row.remark
        this.model.resourcesId = row.resourcesId
        this.initImage(row.resourcesId)
      },
      close () {
        this.visible = false
        this.model.checkCancel = false
        this.$refs.upload.reset()
      },
      initImage (resourcesId) {
        api.resourceManage.getImage({resourcesId: resourcesId}).then((response) => {
          this.$refs.upload.setFiles(response.data.data.imageFileVos)
        }, (response) => {
          console.error(response)
        })
      },
      confirm () {
        this.checkResources().then((data) => {
          this.updateImages()
        })
      },
      checkResources () {
        let param = {
          resourcesId: this.model.resourcesId,
          inventoryNum: this.model.number
        }
        let proimse = new Promise((resolve, reject) => {
          if (this.model.checkCancel) {
            api.resourceManage.resourcesEvacuate(param).then((response) => {
              const data = response.data
              if (data.meta.code === 100000) {
                resolve(response.data.data)
              } else {
                this.$notify({title: 'tip', message: response.meta.code, duration: 2000})
              }
            }, (response) => {
              this.$notify({title: 'tip', message: response.meta.code, duration: 2000})
            })
          } else {
            api.resourceManage.resourcesInventory(param).then((response) => {
              const data = response.data
              if (data.meta.code === 100000) {
                resolve(response.data.data)
              } else {
                this.$notify({title: 'tip', message: data.meta.code, duration: 2000})
              }
            }, (response) => {
              this.$notify({title: 'tip', message: response.data.meta.code, duration: 2000})
            })
          }
        })
        return proimse
      },
      updateImages () {
        let params = {
          resourcesId: this.model.resourcesId,
          addImageList: this.$refs.upload.getAddFiles(),
          delImageList: this.$refs.upload.getDelFiles()
        }
        if (params.addImageList.length > 0 || params.delImageList.length > 0) {
          api.resourceManage.uploadImage(params).then((response) => {
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
              this.$notify({
                title: 'tip',
                message: data.meta.code,
                duration: 2000
              })
            }
          }).finally(() => {
          })
        } else {
          this.$notify({
            title: 'tip',
            message: '操作成功',
            duration: 2000
          })
          this.$emit('callback')
          this.close()
        }
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

  .button-margin {
    margin-left: 1.5rem;
  }
</style>
