<template>
	<div class="loginVue">
		<header class="header">
			<div class="header-box">
				<img src="../assets/images/logo.png" alt="">
				<span class="header-title">您好，欢迎登录恒逸资源共享平台！</span>
			</div>
		</header>
		<div class="body">
			<div class="body-content">
				<img src="" alt="">
				<div class="login-form">
					<div class="title1">
						<span>User Login</span>
					</div>
					<div class="title2">用户登录</div>
					<div class="form-item">
						<img class="logo" src="../assets/images/form_user.png" alt="">
						<input v-model="loginForm.username" placeholder="请输入帐号">
					</div>
					<div class="form-item">
						<img class="logo" src="../assets/images/form_password.png" alt="">
						<input v-model="loginForm.password" type="password" placeholder="请输入密码" @keyup.enter="handleConfirm">
					</div>
					<!--<div class="form-item form-item-code">-->
					<!--<img class="logo" src="../assets/images/form_code.png" alt="">-->
					<!--<input v-model="loginForm.authCode" placeholder="请输入验证码">-->
					<!--<img class="code-img" :src="codeImg" alt="" @click="handleGetCode">-->
					<!--</div>-->
					<div class="form-item-type">
						<el-radio class="radio" v-model="loginType" label="2">普通用户</el-radio>
						<el-radio class="radio" v-model="loginType" label="1">管理员用户</el-radio>
					</div>
					<button class="formBtn" @click="handleConfirm">确定</button>
				</div>
			</div>
		</div>
		<footer class="footer">
			<span>版权所有：恒逸集团 ©2010-2017 Zhejiang Hengyi Group Co., Ltd. All Rights Reserved</span>
		</footer>
	</div>
</template>

<script>
  import * as names from '../router/names.js'
  import storage from '../module/storage'
  import * as api from '../api'
  class AccountTypes {
    static Admin = 1
    static Normal = 2
  }
  export default {
    mouthed () {
    },
    data () {
      return {
        loginType: AccountTypes.Normal.toString(),
        codeImg: '',
        loginForm: {
          username: '',
          password: '',
          authCode: ''
        }
      }
    },
    methods: {
      //      handleGetCode () {
      //        api.common.getCode().then(response => {
      //          console.log(response)
      //        }).catch(data => {
      //          console.log(data)
      //          this.codeImg = ''
      //        })
      //      },
      handleConfirm () {
        if (this.loginForm.username.trim().length === 0 ||
          //          this.loginForm.authCode.trim().length === 0 ||
          this.loginForm.password.trim().length === 0) {
          this.$notify({
            title: 'tip',
            message: '登录信息未填写',
            type: 'error'
          })
          return
        }
        let params = {
          account: this.loginForm.username,
          password: this.loginForm.password
        }
        switch (parseInt(this.loginType)) {
          case AccountTypes.Normal:
            this.normalLogin(params)
            break
          case AccountTypes.Admin:
            this.adminLogin(params)
            break
          default:
            console.error('type error')
            break
        }
      },
      normalLogin (params) {
        api.common.userlogin(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            data.data.type = AccountTypes.Normal
            storage.setUser(data.data)
            this.$router.push({name: names.RESOURCE__SHARE})
            this.$notify({
              type: 'success',
              title: 'tip',
              message: data.message
            })
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
      },
      adminLogin (params) {
        api.common.adminlogin(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            data.data.type = AccountTypes.Admin
            storage.setUser(data.data)
            this.$router.push({name: names.RESOURCE__MANAGER})
            this.$notify({
              type: 'success',
              title: 'tip',
              message: data.message
            })
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

<style lang="scss" scoped>
	.loginVue {
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

	.header {
		flex: 0 0 auto;
		min-height: 4rem;
		background-color: #fff;
	}

	.header-box {
		margin: auto;
		width: 62.5rem;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}

	.body {
		flex: 1 1 auto;
		background-color: #3b9dd8;
		display: flex;
		justify-content: center;
		align-items: stretch;
	}

	.body-content {
		width: 62.5rem;
		background: url("../assets/images/login_img.png");
		background-repeat: no-repeat;
		background-position: 0 8.75rem;
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;

	.login-form {
		width: 21.875rem;
		background-color: #fff;
		margin-top: 8.75rem;
		padding: 2.5rem 1.5rem;
		border-radius: 4px;

	.title1 {
		border-bottom: 1px solid #b8b6b6;
		text-align: center;
		height: 1rem;

	span {
		font-size: 1.5rem;
		color: #b8b6b6;
		display: inline-block;
		background-color: #fff;
		width: 9rem;
	}

	}
	.title2 {
		margin-top: 1.5rem;
		font-size: 1.5rem;
		color: #238dcd;
		text-align: center;
		font-weight: bold;
		margin-bottom: 1.5rem;
	}

	.form-item {
		height: 2.5rem;
		border: 1px solid #c9d1d6;
		margin: 0 1rem;
		margin-bottom: 1rem;

	.logo {
		border-right: 1px solid #c9d1d6;
		padding: 0 .5rem;
		vertical-align: middle;
	}

	input {
		vertical-align: middle;
		line-height: 2.5rem;
		padding: 0;
		padding-left: .5rem;
		border: none;
	}

	}
	.form-item-type {
		text-align: center;
		margin-bottom: 1rem;
	}

	.form-item-code {
		position: relative;
		width: 11rem;

	input {
		width: 7rem;
	}

	.code-img {
		position: absolute;
		top: 0;
		right: -8.8rem;
		width: 8rem;
		height: 2.55rem;
	}

	}
	.formBtn {
		display: block;
		line-height: 2.5rem;
		background-color: #3b9dd8;
		color: #fff;
		font-size: 1.2rem;
		border: none;
		width: 90%;
		text-align: center;
		margin: 0 1rem;
		cursor: pointer;
	}

	}
	}

	.footer {
		flex: 0 0 2.94rem;
		background-color: #fff;
		font-size: .88rem;
		display: flex;
		justify-content: center;
		align-items: center;
		word-wrap: break-word;
		word-break: break-all;
		text-align: center;
	}

	@media screen and (max-width: 1000px) {
		.header-box {
			width: 100%;
			flex-direction: column;
			justify-content: center;
			padding-bottom: .94rem;
		}

		.body-content {
			width: 100%;
			justify-content: center;
			background-image: url("");
		}

		.footer {
			padding: .63rem 1.25rem;
		}
	}

	}
</style>
