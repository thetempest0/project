<template>
  <div class="table-border">
    <section ref="tableContainer">
      <el-table :data="tableData" v-loading="tableLoading" border stripe style="width: 100%">
        <el-table-column class-name="color-main" label="供应商" width="180" align="center" header-align="center">
          <template scope="scope">
            <el-tooltip class="item" effect="light" placement="top">
              <template slot="content">
                <jk-tip-supplier-detail :item="scope.row"></jk-tip-supplier-detail>
              </template>
              <span>{{ scope.row.supplierName }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="resourcesTypeName" label="资源类型" width="180" align="center"
                         header-align="center"></el-table-column>
        <el-table-column label="备注说明" align="center" header-align="center">
          <template scope="scope">
            <div class='remark-contrainer'>
              <div class='remark-img'>
                <img :src='getImg(scope.row.imgStatus)' @click='imgClick(scope.row)'>
              </div>
              <span class='remark-margin'>{{scope.row.remark}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="availableNum" label="可借出" width="180" align="center"
                         header-align="center"></el-table-column>
        <el-table-column prop="borrowNum" label="已借出" width="180" align="center"
                         header-align="center"></el-table-column>
        <el-table-column prop="utitName" label="单位" width="180" align="center" header-align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center" header-align="center">
          <template scope="scope">
            <el-button type="text" @click="btnBorrowClick(scope.$index, scope.row,scope.store)">借用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <el-row type="flex" justify="end">
      <el-pagination ref="pagination"
                     @size-change="tableSizeChange"
                     @current-change="tableCurrentChange"
                     :current-page="pagination.currentPage"
                     :page-sizes="[10, 20, 30]"
                     :page-size="pagination.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.totalCount">
      </el-pagination>
    </el-row>
    <jk-dlg-image ref='image'></jk-dlg-image>
    <jk-dlg-borrow ref="borrow" @callback='callback'></jk-dlg-borrow>
  </div>
</template>
<script>
  import * as api from '../../api/index'
  export default {
    components: {
      'jk-dlg-image': require('../common/image.vue'),
      'jk-tip-supplier-detail': require('./tip-supplier-detail.vue'),
      'jk-dlg-borrow': require('./dlg-borrow.vue')
    },
    props: {
      searchText: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        borrowItem: {},
        pagination: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 25
        },
        currentResource: null,
        tableLoading: false,
        tableData: []
      }
    },
    mounted () {
    },
    methods: {
      tableSizeChange (val) {
        this.pagination.currentPage = 1
        this.pagination.pageSize = val
        this.setData(this.currentResource)
      },
      tableCurrentChange (val) {
        this.pagination.currentPage = val
        this.setData(this.currentResource)
      },
      setData (currentResource) {
        this.currentResource = currentResource
        this.tableData.splice(0, this.tableData.length)
        this.tableLoading = true
        api.resourceShare.getResourcesList(this.searchText, this.pagination.currentPage,
          this.pagination.pageSize, this.currentResource.index)
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
      btnBorrowClick (index, row, store) {
        this.$refs.borrow.show(row)
      },
      imgClick (row) {
        this.$refs.image.show(row)
      },
      getImg (status) {
        switch (status) {
          case '0':
            return '/static/img/iocn_img_none.png'
          case '1':
            return '/static/img/iocn_img.png'
        }
      },
      callback () {
        this.setData(this.currentResource)
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../assets/css/remark-img.scss";
</style>
