<template>
	<el-dialog
		title="重置密码"
		class="dialogChangePasswordVue"
		v-model="dialogToggle">
		<el-form
			class="formStyle"
			ref="passwordForm"
			:model="passwordForm"
			:rules="rulesPassword"
			label-width="100px"
			label-position="left">
			<el-form-item label="原始密码" prop="oldPassword">
				<el-input v-model="passwordForm.oldPassword" type="password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="newPassword">
				<el-input v-model="passwordForm.newPassword" type="password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="再次输入" prop="checkPass">
				<el-input v-model="passwordForm.checkPass" type="password" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>

		<hr>

		<section class="dialog-footer">
			<el-button @click="cancelPasswordForm">取消</el-button>
			<el-button @click="confirmPasswordForm">确定</el-button>
		</section>

	</el-dialog>
</template>
<script>
  import * as api from '../../api'
  import * as names from '../../router/names.js'
  import storage from '../../module/storage.js'
  export default {
    data () {
      return {
        dialogToggle: false,
        loginInfo: '',
        passwordForm: {
          oldPassword: '',
          newPassword: '',
          checkPass: ''
        },
        // 修改密码 校验
        rulesPassword: {
          oldPassword: [
            {required: true, message: '请输入原始密码', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                api.common.checkOldPassword({
                  userId: this.loginInfo.userId,
                  userType: this.loginInfo.type === 1 ? 'S' : 'N',
                  oldPassword: value
                }).then(response => {
                  const data = response.data
                  if (data.messageType === 1) {
                    callback()
                  } else {
                    callback(new Error(data.message))
                  }
                }).catch(data => {
                  console.error(data)
                  callback(new Error(data.message))
                })
              },
              trigger: 'blur',
              required: true
            }
          ],
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'}
          ],
          checkPass: [
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'))
                } else if (value !== this.passwordForm.newPassword) {
                  callback(new Error('两次输入密码不一致!'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
              required: true
            }
          ]
        }
      }
    },
    methods: {
      show () {
        this.loginInfo = storage.getUser()
        this.dialogToggle = true
        this.$nextTick(() => {
          this.$refs.passwordForm.resetFields()
        })
      },
      cancelPasswordForm () {
        this.dialogToggle = false
      },
      confirmPasswordForm () {
        this.$refs.passwordForm.validate((valid) => {
          if (valid) {
            api.common.updatePassword({
              userId: this.loginInfo.userId,
              password: this.passwordForm.newPassword,
              oldPassword: this.passwordForm.oldPassword,
              userType: this.loginInfo.type === 1 ? 'S' : 'N'
            }).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.$notify({
                  type: 'success',
                  title: 'tip',
                  message: data.message
                })
                this.dialogToggle = false
                sessionStorage.clear()
                this.$router.push({name: names.LOGIN})
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
            }).catch(data => {
              console.error(data)
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
	.dialogChangePasswordVue {

	.formStyle {
		width: 50%;
		margin: 1rem auto;
	}

	}

</style>
