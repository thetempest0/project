<template>
	<div class="supplierResourceTypeVue">
		<el-row type="flex" justify="end">
			<el-button @click="handleAdd" icon="plus">新增</el-button>
		</el-row>

		<el-row class="marginTop">
			<el-table :data="tableData" border style="width: 100%" v-loading="tableLoading">
				<el-table-column prop="name" label="资源名称" align="center"></el-table-column>
				<el-table-column prop="resourcesCategoryId" label="类别" align="center"
				                 :formatter="formatterCategory"></el-table-column>
				<el-table-column prop="unitId" label="单位" align="center" :formatter="formatterUnit"></el-table-column>
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

		<dialog-supplier-resource-type ref="dialogSupplierResourceType" :unit-list="unitList"
		                               :category-list="categoryList"
		                               @click-refresh="setData"></dialog-supplier-resource-type>
	</div>
</template>
<script>
  import * as api from '../../api'
  import _ from 'lodash'
  export default {
    components: {
      'dialog-supplier-resource-type': require('./dialog-supplier-resource-type.vue')
    },
    data () {
      return {
        originData: [],
        tableLoading: false,
        tableData: [],
        sel: [],
        unitList: [],
        categoryList: [],
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
      this.getSelectList()
    },
    methods: {
      // 获取数据
      setData () {
        this.tableLoading = true
        api.console.getResourcesTypeList({}).then((response) => {
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
      // 获取选择列表
      getSelectList () {
        // 获取单位list
        api.console.getUnitList().then(response => {
          const data = response.data
          if (data.meta.code === 100000) {
            this.unitList = response.data.data
          } else {
            console.error(response)
          }
        }, response => {
          console.error(response)
        }).catch(data => {
          console.error(data)
        })
        // 获取类别list
        api.console.getCategoryList().then(response => {
          const data = response.data
          if (data.meta.code === 100000) {
            this.categoryList = response.data.data
          } else {
            console.error(response)
          }
        }, response => {
          console.error(response)
        }).catch(data => {
          console.error(data)
        })
      },
      handleAdd () {
        this.$refs.dialogSupplierResourceType.show(null)
      },
      handleEdit (index, row) {
        this.$refs.dialogSupplierResourceType.show(JSON.parse(JSON.stringify(row)))
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
      },
      formatterCategory (row, column) {
        for (let item of this.categoryList) {
          if (item.id === row.resourcesCategoryId) {
            return item.name
          }
        }
      },
      formatterUnit  (row, column) {
        for (let item of this.unitList) {
          if (item.id === row.unitId) {
            return item.name
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss">
	.supplierResourceTypeVue {
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
