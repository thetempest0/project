<template>
	<div class="supplierCategoryVue">
		<el-row type="flex" justify="end">
			<el-button @click="handleAdd" icon="plus">新增</el-button>
		</el-row>

		<el-row class="marginTop">
			<el-table :data="tableData" border style="width: 100%" v-loading="tableLoading">
				<el-table-column prop="name" label="供应商类型名称" align="center"></el-table-column>
				<el-table-column prop="descripe" label="描述" align="left"></el-table-column>
				<el-table-column label="操作" align="center">
					<template scope="scope">
						<el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-pagination
			class="pageBox"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page.currentPage"
			:total="page.total"
			:page-sizes="page.pageSizes"
			:page-size="page.pageSize"
			layout="total, sizes, prev, pager, next, jumper">
		</el-pagination>
		<dialog-supplier-category ref="dialogSupplierCategory" @click-refresh="setData"></dialog-supplier-category>
	</div>
</template>
<script>
  import * as api from '../../api'
  import _ from 'lodash'
  export default {
    components: {
      'dialog-supplier-category': require('./dialog-supplier-category.vue')
    },
    data () {
      return {
        tableLoading: false,
        originData: [],
        tableData: [],
        sel: [],
        page: {
          currentPage: 1,
          total: 0,
          pageSize: 10,
          pageSizes: [
            10, 20, 30
          ]
        }
      }
    },
    mounted () {
      this.setData()
    },
    methods: {
      // 获取数据
      setData () {
        this.tableLoading = true
        api.console.getSupplierTypeList().then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.originData = data.data
            this.showData()
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
        }, (response) => {
          console.error(response)
        }).catch(data => {
          console.error(data)
        }).finally(() => {
          this.tableLoading = false
        })
      },
      handleAdd () {
        this.$refs.dialogSupplierCategory.show(null)
      },
      handleEdit (index, row) {
        this.$refs.dialogSupplierCategory.show(JSON.parse(JSON.stringify(row)))
      },
      handleSizeChange (pageSize) {
        this.page.pageSize = pageSize
        this.page.currentPage = 1
        this.showData()
      },
      handleCurrentChange (current) {
        this.page.currentPage = current
        this.showData()
      },
      showData () {
        this.page.total = this.originData.length
        this.tableData = _.chunk(this.originData, this.page.pageSize)[this.page.currentPage - 1]
      }
    }
  }
</script>
<style scoped lang="scss">
	.supplierCategoryVue {
		border: 1px solid #CCCCCC;
		padding: 10px;
	}

	.marginTop {
		margin-top: 10px;
	}

	.pageBox {
		margin-top: 10px;
		text-align: right;
	}
</style>
