<template>
  <div class="table-border">
    <section ref="tableContainer">
      <el-table :data="tableData" v-loading="tableLoading" border style="width: 100%">
        <el-table-column prop="id" label="单据编号" width="120" align="center" header-align="center">
        </el-table-column>
        <el-table-column class-name="color-main" prop="supplierName" label="供应商(借)" align="center"
                         header-align="center"></el-table-column>
        <el-table-column prop="typeName" label="资源类型" align="center" header-align="center"></el-table-column>
        <el-table-column prop="remark" label="备注说明" width="180" align="left" header-align="center"></el-table-column>
        <el-table-column prop="borrowDateTime" label="借用日期" width="120" align="center" header-align="center">
          <template scope="scope">
            <span>{{scope.row.borrowDateTime|time-format('YYYY/MM/DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="returnDateTime" label="归还日期" width="120" align="center" header-align="center">
          <template scope="scope">
            <span>{{scope.row.returnDateTime|time-format('YYYY/MM/DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="borrowNum" label="借用" width="80" align="center" header-align="center"></el-table-column>
        <el-table-column prop="returnNum" label="已归" width="80" align="center" header-align="center"></el-table-column>
        <el-table-column prop="unitName" label="单位" width="80" align="center" header-align="center"></el-table-column>
        <el-table-column prop="status" label="状态" :formatter="fmt.billStatus" width="180" align="center"
                         header-align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center" header-align="center">
          <template scope="scope">
            <section v-if="scope.row.status==='1'">
              <el-button type="text" @click="btnAppovalBorrowClick(scope.$index, scope.row,scope.store)">审批</el-button>
              <span>|</span>
              <el-button type="text" @click="btnBorrowPrintClick(scope.$index, scope.row,scope.store)">打印</el-button>
            </section>
            <section v-if="scope.row.status==='5'">
              <el-button type="text" @click="btnAppovalReturnClick(scope.$index, scope.row,scope.store)">审批</el-button>
              <span>|</span>
              <el-button type="text" @click="btnReturnPrintClick(scope.$index, scope.row,scope.store)">打印</el-button>
            </section>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <el-row type="flex" justify="end">
      <el-pagination ref="pagination"
                     @size-change="tableSizeChange"
                     @current-change="tableCurrentChange"
                     :current-page="pagination.currentPage"
                     :page-sizes="[10, 25, 50]"
                     :page-size="pagination.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.totalCount">
      </el-pagination>
    </el-row>
    <jk-dlg-image ref='image'></jk-dlg-image>
    <jk-dlg-approval-borrow @callback='callback' ref="borrow"></jk-dlg-approval-borrow>
    <jk-dlg-approval-return @callback='callback' ref="return"></jk-dlg-approval-return>
    <jk-dlg-borrow-print ref="borrowPrint"></jk-dlg-borrow-print>
    <jk-dlg-return-print ref="returnPrint"></jk-dlg-return-print>
  </div>
</template>
<script>
  import fmt from '../../module/formatter'
  import * as api from '../../api'
  export default {
    components: {
      'jk-dlg-image': require('../common/image.vue'),
      'jk-dlg-approval-borrow': require('./dlg-approval-borrow.vue'),
      'jk-dlg-approval-return': require('./dlg-approval-return.vue'),
      'jk-dlg-return-print': require('./dlg-return-print.vue'),
      'jk-dlg-borrow-print': require('./dlg-borrow-print.vue')
    },
    props: {
      searchText: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        fmt,
        pagination: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 1
        },
        tableLoading: false,
        tableData: []
      }
    },
    mounted () {
      this.setData()
    },
    methods: {
      tableSizeChange (val) {
        this.pagination.currentPage = 1
        this.pagination.pageSize = val
        this.setData()
      },
      tableCurrentChange (val) {
        this.pagination.currentPage = val
        this.setData()
      },
      setData () {
        this.tableData.splice(0, this.tableData.length)
        this.tableLoading = true
        api.resourceShare.getBillListLend(this.searchText, this.pagination.currentPage,
          this.pagination.pageSize)
          .then((response) => {
            const data = response.data.data
            for (let item of data.list) {
              this.tableData.push(item)
            }
            this.pagination.totalCount = data.count
          }, (response) => {
            this.$notify({
              title: 'tip',
              message: JSON.stringify(response),
              duration: 2000
            })
          })
          .catch((ex) => {
          })
          .finally(
            this.tableLoading = false
          )
      },
      btnAppovalBorrowClick (index, row, store) {
        this.$refs.borrow.show(row)
      },
      btnAppovalReturnClick (index, row, store) {
        this.$refs.return.show(row)
      },
      btnBorrowPrintClick (index, row, store) {
        this.$refs.borrowPrint.show(row)
      },
      btnReturnPrintClick (index, row, store) {
        this.$refs.returnPrint.show(row)
      },
      imgClick (row) {
        this.$refs.image.show(row)
      },
      callback () {
        this.setData()
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../assets/css/remark-img.scss";
</style>
