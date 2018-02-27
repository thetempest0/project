<template>
  <div>
    <el-row type='flex'>
      <div class="cell-width">供应商类型：</div>
      <div class="content-width">{{model.type}}</div>
      <div class="cell-width">联系电话：</div>
      <div class="content-width">{{model.phone}}</div>
    </el-row>
    <el-row type='flex' class="el-row-top">
      <div class="cell-width">供应商资质：</div>
      <div class="content-width">{{model.level}}</div>
      <div class="cell-width">业务范围：</div>
      <div class="content-width">{{model.level}}</div>
    </el-row>
  </div>
</template>
<script>
  import * as api from '../../api'
  export default {
    components: {},
    props: {
      item: {
        type: Object
      }
    },
    data () {
      return {
        model: {
          type: '',
          phone: '',
          level: '',
          businesScope: ''
        }
      }
    },
    mounted () {
      api.resourceShare.getSupplierById(this.item.supplieId).then(response => {
        const data = response.data.data
        this.model.type = data.supplierTypeName
        this.model.phone = data.supplier.phone
        this.model.level = data.supplier.level
        this.model.businesScope = data.supplier.businesScope
      }, response => {
        console.error(response)
      })
    },
    methods: {}
  }
</script>
<style scoped lang="scss">
  .cell-width {
    min-width: 5rem;
  }

  .content-width {
    min-width: 10rem;
  }

  .el-row-top {
    margin-top: 0.8rem;
  }
</style>
