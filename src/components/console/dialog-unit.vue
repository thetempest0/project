<template>
	<el-dialog
		:title="dialogTittle + '单位'"
		v-model="dialogToggle"
		size="small">
		<el-form
			class="formStyle"
			ref="dialogForm"
			:rules="dialogFormRules"
			:model="formModel"
			label-position="left"
			label-width="60px">

			<el-form-item
				label="单位"
				prop="name">

				<el-input
					v-model="formModel.name"
					auto-complete="off">
				</el-input>
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
            {required: true, message: '请输入单位', trigger: 'blur'},
            {min: 0, max: 8, message: '长度超出限制', trigger: 'change'}
          ]
        }
      }
    },
    computed: {
      formModel () {
        if (!this.srcObject) {
          this.srcObject = {
            name: '',
            id: ''
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
        this.$refs.dialogForm.resetFields()
      },
      // 确定
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
        api.console.addUnit({
          name: this.formModel.name
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
        api.console.updateUnit({
          unitId: this.formModel.id,
          name: this.formModel.name
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
		margin: 3rem auto;
	}
</style>
