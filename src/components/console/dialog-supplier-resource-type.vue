<template>
	<el-dialog :title="dialogTittle + '资源类型'" v-model="dialogToggle" size="small">
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
			<el-form-item label="类型" prop="resourcesCategoryId">
				<el-select v-model="formModel.resourcesCategoryId" placeholder="请选择">
					<template v-for="item in categoryList">
						<el-option
							:label="item.name"
							:value="item.id">
						</el-option>
					</template>
				</el-select>
			</el-form-item>
			<el-form-item label="单位" prop="unitId">
				<el-select v-model="formModel.unitId" placeholder="请选择">
					<template v-for="item in unitList">
						<el-option
							:label="item.name"
							:value="item.id">
						</el-option>
					</template>
				</el-select>
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
    components: {},
    data () {
      return {
        dialogToggle: false,
        dialogTittle: '',
        srcObject: null,
        dialogFormRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 0, max: 32, message: '长度不得超过32个字符', trigger: 'change'}
          ],
          resourcesCategoryId: [
            {required: true, message: '请选择类别', trigger: 'blur'}
          ],
          unitId: [
            {required: true, message: '请选择单位', trigger: 'blur'}
          ],
          descripe: [
            {min: 0, max: 64, message: '长度不得超过64个字符', trigger: 'change'}
          ]
        }
      }
    },
    props: ['unitList', 'categoryList'],
    computed: {
      formModel () {
        if (!this.srcObject) {
          this.srcObject = {
            name: '',
            resourcesCategoryId: '',
            unitId: '',
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
        this.$refs.dialogForm.resetFields()
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
        api.console.addResourcesType({
          name: this.formModel.name,
          resourcesCategoryId: this.formModel.resourcesCategoryId,
          unitId: this.formModel.unitId,
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
        api.console.updateResourcesType({
          resourcesTypeId: this.formModel.id,
          resourcesTypeName: this.formModel.name,
          resourcesCategoryId: this.formModel.resourcesCategoryId,
          unitId: this.formModel.unitId,
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
