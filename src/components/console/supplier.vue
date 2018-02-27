<template>
	<div class="supplierVue">

		<el-row type="flex" justify="end">
			<el-button @click="handleAdd" icon="plus">新增</el-button>
			<el-input class="inputStyle" v-model="search" placeholder="名称" icon="search"
			          :on-icon-click="handleSearch"></el-input>
		</el-row>

		<el-row>
			<el-table :data="tableData" border style="width: 100%" v-loading="tableLoading" class="marginTop">
				<el-table-column prop="code" label="供应商编号" width="180" align="center"></el-table-column>
				<el-table-column prop="name" label="名称" width="180" align="center"></el-table-column>
				<el-table-column prop="businesScope" label="业务范围" align="center"></el-table-column>
				<el-table-column prop="supplierTypeName" label="类型" align="center"></el-table-column>
				<el-table-column prop="phone" label="联系" align="center"></el-table-column>
				<el-table-column prop="level" label="资质" align="center"></el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template scope="scope">
						<el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<span>|</span>
						<el-button type="text" @click="handleChangePassword(scope.$index, scope.row)">重置密码</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>

		<el-pagination
			class="pageBox"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="pageSizes"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total">
		</el-pagination>

		<dialog-supplier ref="dialogSupplier" @click-refresh="setData"></dialog-supplier>

	</div>
</template>

<script>
  import * as api from '../../api'
  import storage from '../../module/storage.js'
  export default {
    components: {
      'dialog-supplier': require('./dialog-supplier.vue')
    },
    mounted () {
      this.setData()
    },
    data () {
      return {
        tableLoading: false,
        tableData: [],
        search: '',
        currentPage: 1,
        pageSize: 10,
        pageSizes: [
          10, 20, 30
        ],
        total: 0
      }
    },
    methods: {
      // 获取数据
      setData () {
        this.tableLoading = true
        api.console.getSupplierListByName({
          pageIndex: this.currentPage,
          pageCount: this.pageSize,
          name: this.search
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.tableData = data.data.list
            this.total = data.data.count
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
        }).catch(ex => {
          console.error(ex)
        }).finally(() => {
          this.tableLoading = false
        })
      },
      // 搜索
      handleSearch () {
        this.currentPage = 1
        this.setData()
      },
      // 修改密码
      handleChangePassword (index, row) {
        this.$confirm('重置当前帐号密码?', 'tip', {
          confirmButtonText: 'yes',
          cancelButtonText: 'no',
          showCancelButton: true,
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = 'loading...'
              api.common.resetPassword({
                userId: row.userId,
                manageUserId: storage.getUser().userId
              }).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  instance.confirmButtonLoading = false
                  instance.confirmButtonText = '确定'
                  this.$notify({
                    type: 'success',
                    title: 'tip',
                    message: data.message
                  })
                  return true
                }
                if (data.messageType === 2) {
                  instance.confirmButtonText = '确定'
                  this.$notify({
                    type: 'error',
                    title: 'tip',
                    message: data.message
                  })
                  return false
                }
                if (data.messageType === 0) {
                  instance.confirmButtonText = '确定'
                  console.error(response)
                  return false
                }
              }, response => {
                console.error(response)
              }).catch(data => {
                console.error(data)
              })
            } else {
              instance.confirmButtonLoading = false
            }
            done()
          }
        }).catch(() => {
        })
      },
      // 新增
      handleAdd () {
        this.$refs.dialogSupplier.show(null)
      },
      // 编辑
      handleEdit (index, row) {
        this.$refs.dialogSupplier.show(JSON.parse(JSON.stringify(row)))
      },
      // ================================ 分页  ==================================
      // 每页显示条目个数
      handleSizeChange (size) {
        this.currentPage = 1
        this.pageSize = size
        this.setData()
      },
      // 当前页数
      handleCurrentChange (currentPage) {
        this.currentPage = currentPage
        this.setData()
      }
    }
  }
</script>

<style lang="scss" scoped>
	.supplierVue {
		border: 1px solid #CCCCCC;
		padding: 10px;
	}

	/*顶部距离*/
	.marginTop {
		margin-top: 10px;
	}

	/*搜索框*/
	.inputStyle {
		width: 200px;
		margin-left: 20px;
	}

	/*pageBox*/
	.pageBox {
		margin-top: 10px;
		text-align: right;
	}

</style>
