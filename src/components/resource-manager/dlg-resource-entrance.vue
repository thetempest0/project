<!--入场登记-->
<template>
  <el-dialog v-model="visible" title="入场登记" @close="close">
    <section class="dialog-body">

      <el-row type="flex" justify="center" align="center">
        <!--类别-->
        <el-col :span="3" class="vertical-center">
          <div class="">资源类型：</div>
        </el-col>
        <el-col :span="12" class="vertical-center">
          <template>
            <el-select class="small-input" v-model="category.value" placeholder="请选择" @change="category.change">
              <el-option v-for="item in category.options" :label="item.label" :value="item.value"
                         :key="item.value"></el-option>
            </el-select>
            <el-select class="small-input" v-model="subCategory.value" placeholder="请选择">
              <el-option v-for="item in subCategory.options" :label="item.label" :value="item.value"
                         :key="item.value"></el-option>
            </el-select>
          </template>
        </el-col>
        <!--类型-->
        <el-col :span="3" class="vertical-center">
          <div class="">入场数量：</div>
        </el-col>
        <el-col :span="6" class="vertical-center">
          <template>
            <el-input-number class="small-input" :min="1" :max="2000" v-model="initNum"></el-input-number>
          </template>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" align="center">
        <el-col :span="3">
          <div>备注说明：</div>
        </el-col>
        <el-col :span="21" class="vertical-center">
          <el-input class="middle-input" placeholder="请输入备注说明" v-model="remark"></el-input>
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
          <el-button @click="close">取消</el-button>
          <el-button @click="confirm">入场申请</el-button>
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
        visible: false,
        remark: '',
        initNum: 0,
        // 类别
        category: {
          value: '',
          options: [],
          initCategory: () => {
            this.category.options.splice(0, this.category.options.length)
            this.category.value = ''
            api.console.getCategoryList().then((response) => {
              for (let item of response.data.data) {
                this.category.options.push({value: item.id, label: item.name})
              }
            }, (response) => {
              this.$notify({title: 'tip', message: JSON.stringify(response), duration: 2000})
            })
          },
          change: () => {
            this.subCategory.options.splice(0, this.subCategory.options.length)
            this.subCategory.value = ''
            api.console.getResourcesTypeList({resourcesCategoryId: this.category.value}).then((response) => {
              for (let item of response.data.data) {
                this.subCategory.options.push({value: item.id, label: item.name})
              }
            }, (response) => {
              this.$notify({title: 'tip', message: JSON.stringify(response), duration: 2000})
            })
          }
        },
        // 子类型
        subCategory: {
          value: '',
          options: []
        }
      }
    },
    mounted () {
      this.category.initCategory()
    },
    methods: {
      show () {
        this.visible = true
      },
      close () {
        this.visible = false
        this.remark = ''
        this.initNum = 0
        this.category.value = ''
        this.subCategory.value = ''
        this.$refs.upload.reset()
      },
      confirm () {
        if (!this.checkError()) {
          return
        }
        this.addResource().then((data) => {
          this.uploadImage(data)
        })
      },
      addResource () {
        let param = {
          resourcesTypeId: this.subCategory.value,
          remark: this.remark,
          initNum: this.initNum
        }
        let proimse = new Promise((resolve, reject) => {
          api.resourceManage.entrance(param).then((response) => {
            resolve(response.data.data)
          })
        })
        return proimse
      },
      uploadImage (data) {
        let param = {
          resourcesId: data,
          addImageList: [],
          delImageList: []
        }
        for (let file of this.$refs.upload.getFiles()) {
          param.addImageList.push({id: file.uuid, ext: file.type, type: file.type, data: file.data, name: file.name})
        }
        api.resourceManage.uploadImage(param).then((response) => {
          const data = response.data
          if (data.meta.code === 100000) {
            this.notify('success', '操作成功')
            this.$emit('callback')
            this.close()
          } else {
            this.notify('error', data.meta.code)
          }
        }, (response) => {
          console.error(response)
        })
      },
      checkError () {
        if (!this.category.value) {
          this.notify('error', '请选择类别')
          return false
        }
        if (!this.subCategory.value) {
          this.notify('error', '请选择子类别')
          return false
        }
        if (!this.remark) {
          this.notify('error', '请填备注')
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
    width: 8.1rem;
  }

  .middle-input {
    width: 43.9888rem;
  }
</style>
