<template>
  <div class="table-border">
    <section ref="tableContainer">
      <el-table :data="tableData" border stripe v-loading="tableLoading">
        <el-table-column prop="resourcesTypeName" label="资源类型" align="center" header-align="center"></el-table-column>
        <el-table-column label="备注说明" align="left" header-align="center" width="300" class-name="color-main">
          <template scope="scope">
            <div class='remark-contrainer'>
              <div class='remark-img'>
                <img :src='getImg(scope.row.imgStatus)' @click='imgClick(scope.row)'>
              </div>
              <span class='remark-margin'>{{scope.row.remark}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="入场日期" width="120" align="center" header-align="center">
          <template scope="scope">
            <span>{{scope.row.initDatetime|time-format('YYYY/MM/DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="离场日期" width="120" align="center" header-align="center">
          <template scope="scope">
            <span>{{scope.row.endDatetime|time-format('YYYY/MM/DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总量" align="center" header-align="center">
          <template scope="scope">
            <!--<el-tooltip placement="bottom" effect="light">-->
            <!--<div slot="content" class="tooltip-p">-->
            <!--<p>原始数量: {{ scope.row.number }}</p>-->
            <!--<p>撤场数量: {{ scope.row.occupied }}</p>-->
            <!--<p>盘点数量: {{ scope.row.loaned }}</p>-->
            <!--</div>-->
            <!--<span style="color:red">{{scope.row.num}}</span>-->
            <!--</el-tooltip>-->
            <span style="color:red">{{scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="selfNum" label="自用量" align="center" header-align="center"></el-table-column>
        <el-table-column prop="availableNum" label="可借出" align="center" header-align="center"></el-table-column>
        <el-table-column prop="borrowNum" label="已借出" align="center" header-align="center"></el-table-column>
        <el-table-column prop="utitName" label="单位" align="center" header-align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" header-align="center"
                         :formatter="fmt.resourceStatus"></el-table-column>
        <el-table-column label="操作" align="center" header-align="center">
          <template scope="scope">
            <section v-if="scope.row.status==='1'">
              <el-button type="text" @click="btnApproveClick(scope.row)">审核
              </el-button>
            </section>
            <section v-if="scope.row.status==='3'">
              <el-button type="text" @click="btnApproveClick(scope.row)">审核
              </el-button>
            </section>
            <section v-if="scope.row.status==='4'">
              <el-button type="text" @click="btnApproveClick(scope.row)">审核
              </el-button>
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
                     :page-sizes="[10, 20, 30]"
                     :page-size="pagination.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.totalCount">
      </el-pagination>
    </el-row>
    <jk-dlg-image ref='image'></jk-dlg-image>
    <jk-dlg-approve ref="approve" @callback='callback'></jk-dlg-approve>
  </div>
</template>
<script>
  import * as api from './../../api'
  import fmt from '../../module/formatter'
  export default {
    components: {
      'jk-dlg-image': require('../common/image.vue'),
      'jk-dlg-approve': require('./dlg-resource-approve.vue')
    },
    props: {
      onlyPaddingAudit: {
        type: Boolean,
        required: true
      },
      resourceTypeName: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        fmt,
        currentResource: null,
        pagination: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 25
        },
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
      btnApproveClick (row, store) {
        this.$refs.approve.show(row)
      },
      setData (currentResource) {
        this.currentResource = currentResource
        this.tableData.splice(0, this.tableData.length)
        this.tableLoading = true
        const param = {
          resourceTypeName: this.resourceTypeName,
          pageIndex: this.pagination.currentPage,
          pageCount: this.pagination.pageSize,
          resourcesCategoryId: currentResource.id,
          onlyPaddingAudit: this.onlyPaddingAudit
        }
        api.resourceManage.getManagerList(param).then((response) => {
          const data = response.data.data
          for (let item of data.list) {
            this.tableData.push(item)
          }
          this.pagination.totalCount = data.count
        }).catch(() => {
        }).finally(() => {
          this.tableLoading = false
        })
      },
      search () {
        this.setData(this.currentResource)
      },
      imgClick (row) {
        this.$refs.image.show(row)
      },
      callback () {
        this.setData(this.currentResource)
      },
      getImg (status) {
        switch (status) {
          case '0':
            return '/static/img/iocn_img_none.png'
          case '1':
            return '/static/img/iocn_img.png'
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../assets/css/remark-img.scss";
</style>
