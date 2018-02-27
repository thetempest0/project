<template>
  <el-dialog
      :title="dialogTittle + '供应商'"
      v-model="dialogToggle">
    <el-form
        class="formStyle"
        ref="dialogForm"
        :model="formModel"
        :rules="dialogFormRules"
        label-position="left"
        label-width="100px">

      <el-form-item label="编号" prop="code">
        <el-input v-model="formModel.code" auto-complete="off" :disabled="canEdit"></el-input>
      </el-form-item>
      <el-form-item label="帐号" prop="userAcount">
        <el-input v-model="formModel.userAcount" auto-complete="off" :disabled="canEdit"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="formModel.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="业务范围" prop="businesScope">
        <el-input v-model="formModel.businesScope" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="typeId">
        <el-select v-model="formModel.typeId" placeholder="请选择">
          <template v-for="item in supplierCategoryList">
            <el-option
                :label="item.name"
                :value="item.id">
            </el-option>
          </template>
        </el-select>
      </el-form-item>

      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="formModel.phone" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="资质" prop="level">
        <el-input v-model="formModel.level" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>

    <hr>

    <section class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button @click="handleConfirm">确 定</el-button>
    </section>
  </el-dialog>
</template>
<script>
  import * as api from '../../api'
  class Operations {
    static add = '新增'
    static edit = '修改'
  }
  export default {
    mounted () {
      this.getSupplierTypeList()
    },
    data () {
      return {
        dialogToggle: false,
        dialogTittle: '',
        srcObject: null,
        supplierCategoryList: [],
        dialogFormRules: {
          code: [
            { required: true, message: '请输入编号', trigger: 'blur' },
            { min: 0, max: 11, message: '长度超出限制', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 0, max: 18, message: '长度超出限制', trigger: 'change' }
          ],
          userAcount: [
            { required: true, message: '请输入帐号', trigger: 'blur' },
            { min: 0, max: 18, message: '长度超出限制', trigger: 'change' }
          ],
          businesScope: [
            { required: true, message: '请输入业务范围', trigger: 'blur' },
            { min: 0, max: 64, message: '长度超出限制', trigger: 'change' }
          ],
          typeId: [
            { required: true, message: '请选择类型', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 0, max: 19, message: '长度超出限制', trigger: 'change' }
          ],
          level: [
            { required: true, message: '请输入资质', trigger: 'blur' },
            { min: 0, max: 19, message: '长度超出限制', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      formModel () {
        if (!this.srcObject) {
          this.srcObject = {
            code: '',
            name: '',
            userAcount: '',
            businesScope: '',
            typeId: '',
            phone: '',
            level: ''
          }
        }
        return this.srcObject
      },

      // 能否修改
      canEdit () {
        return !(this.dialogTittle === '新增')
      }
    },
    methods: {
      // 获取供应商类型列表
      getSupplierTypeList () {
        this.supplierCategoryList = []
        api.console.getSupplierTypeList().then(response => {
          const data = response.data
          if (data.meta.code === 100000) {
            this.supplierCategoryList = data.data
          } else {
            console.error(response)
          }
        }, response => {
          console.error(response)
        }).catch(data => {
          console.error(data)
        })
      },

      // 组件开关
      show (data) {
        this.dialogToggle = true
        this.srcObject = data
        if (data) {
          this.operation = Operations.edit
          this.$nextTick(() => {
            this.$refs.dialogForm.validate()
          })
        } else {
          this.operation = Operations.add
          if (this.$refs.dialogForm) {
            this.$refs.dialogForm.resetFields()
          }
        }
        this.dialogTittle = this.operation
      },

      // 取消
      handleCancel () {
        this.dialogToggle = false
      },

      // 确认
      handleConfirm () {
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            if (this.dialogTittle === Operations.add) {
              this.add()
            } else {
              this.update()
            }
          } else {
            return false
          }
        })
      },

      // 新增 请求
      add () {
        api.console.addSupplier({
          account: this.formModel.userAcount,
          code: this.formModel.code,
          name: this.formModel.name,
          businesScope: this.formModel.businesScope,
          typeId: this.formModel.typeId,
          phone: this.formModel.phone,
          level: this.formModel.level
        }).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.$notify({
              type: 'success',
              title: 'tip',
              message: data.message
            })
            this.$emit('click-refresh')
            this.dialogToggle = false
            return true
          }
          if (data.messageType === 2) {
            this.$notify({
              type: 'error',
              title: 'tip',
              message: data.message
            })
            return false
          }
          if (data.messageType === 0) {
            console.error(response)
            return false
          }
        }, response => {
          console.error(response)
        }).catch((data) => {
          console.error(data)
        })
      },

      // 修改 请求
      update () {
        api.console.updateSupplier({
          supplierId: this.formModel.id,
          businesScope: this.formModel.businesScope,
          name: this.formModel.name,
          typeId: this.formModel.typeId,
          phone: this.formModel.phone,
          level: this.formModel.level
        }).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.$notify({
              type: 'success',
              title: 'tip',
              message: data.message
            })
            this.$emit('click-refresh')
            this.dialogToggle = false
            return true
          }
          if (data.messageType === 2) {
            this.$notify({
              type: 'error',
              title: 'tip',
              message: data.message
            })
            return false
          }
          if (data.messageType === 0) {
            console.error(response)
            return false
          }
        }, response => {
          console.error(response)
        }).catch((data) => {
          console.error(data)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .formStyle {
    width: 50%;
    margin: 1rem auto;
  }
</style>
