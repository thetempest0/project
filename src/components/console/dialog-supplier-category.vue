<template>
	<el-dialog :title="dialogTittle + '供应商类型'" v-model="dialogToggle" size="small">
		<el-form
			class="formStyle"
			ref="dialogForm"
			:rules="dialogFormRules"
			:model="formModel"
			label-position="right"
			label-width="60px">

			<el-form-item label="名称" prop="name">
				<el-input v-model="formModel.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="描述" prop="descripe">
				<el-input type="textarea" :rows="5" v-model="formModel.descripe" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<hr>
		<section class="dialog-footer">
			<el-button @click="handleCancel">取消</el-button>
			<el-button @click="handleConfirm">确定</el-button>
		</section>
	</el-dialog>
</template>
<script>
  class Operations {
    static add = '新增'
    static edit = '修改'
  }
  import * as api from '../../api'
  export default {
    data () {
      return {
        dialogToggle: false,
        dialogTittle: '',
        srcObject: null,
        dialogFormRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 0, max: 19, message: '长度超出限制', trigger: 'change'}
          ],
          descripe: [
            {min: 0, max: 64, message: '长度超出限制', trigger: 'change'}
          ]
        }
      }
    },
    computed: {
      formModel () {
        if (!this.srcObject) {
          this.srcObject = {
            name: '',
            descripe: ''
          }
        }
        return this.srcObject
      }
    },
    methods: {
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
        this.$nextTick(() => {
          this.$refs.dialogForm.resetFields()
        })
      },
      // 提交
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
        api.console.addSupplierType({
          name: this.formModel.name,
          descripe: this.formModel.descripe
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
        api.console.updateSupplierType({
          supplierTypeId: this.formModel.id,
          name: this.formModel.name,
          descripe: this.formModel.descripe
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
