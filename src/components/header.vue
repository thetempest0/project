<template>
  <div>
    <section class="header-contrainer">
      <section class="header-item-left">
        <img class="header-logo" src="/static/img/logo.png">
        <strong class="header-title">|</strong>
        <strong class="header-title">资源共享平台</strong>
      </section>
      <el-menu class="header-menu" :default-active="activeIndex" mode="horizontal" @select="headerSelect">
        <template v-for="item in items">
          <el-menu-item v-permission-type='item.permissType' :index="item.index">{{item.text}}</el-menu-item>
        </template>
      </el-menu>
      <section class="header-item-rigth">
        <div class="el-menu-item icom-menu-item menu-center">
          <img src="/static/img/profile.png">
          <span>账号</span>
          <ul class="hoverBox">
            <li @click.stop="resetPassword">修改密码</li>
            <li @click.stop="btnLoginClick">注销</li>
          </ul>
        </div>

        <div v-permission-type='01' class="el-menu-item icom-menu-item" @click="btnConsoleClick">
          <img src="/static/img/console.png">
          <span>工作台</span>
        </div>
      </section>
    </section>

    <!-- 修改密码组件 -->
    <dialog-change-password ref="dialogChangePassword"></dialog-change-password>
  </div>
</template>
<style scoped lang="scss">
  @import "../assets/css/header.scss"
</style>
<script>
  import * as names from '../router/names'
  export default {
    components: {
      'dialog-change-password': require('./common/change-password.vue')
    },
    props: {
      items: {
        type: Array,
        default () {
          return [
            {
              permissType: '10',
              index: names.RESOURCE__SHARE,
              text: '资源共享'
            },
            {
              permissType: '10',
              index: names.RESOURCE__RECORD,
              text: '借用记录'
            },
            {
              permissType: '11',
              index: names.RESOURCE__MANAGER,
              text: '资源管理'
            }
          ]
        }
      }
    },
    data () {
      return {
        activeIndex: names.RESOURCE__MANAGER
      }
    },
    computed: {},
    mounted () {
      this.activeIndex = this.$route.name
    },
    methods: {
      headerSelect (key) {
        this.$router.push({name: key})
      },
      btnLoginClick () {
        sessionStorage.clear()
        this.$router.push({name: names.LOGIN})
      },
      btnConsoleClick () {
        this.$router.push({name: names.CONSOLE})
      },
      // 重置密码
      resetPassword () {
        this.$refs.dialogChangePassword.show()
      }
    }
  }
</script>
