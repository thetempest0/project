<template>
  <el-dialog title="打印" v-model="visible" :modal="true" @colse='close()' :modal-append-to-body="false">
    <section class="dialog-body section-border" id='borrowPrint'>
      <el-row type="flex" class="row-margin" justify="space-between">
        <el-col :span="6">编号：{{model.id}}</el-col>
        <el-col :span="6" class='center'><label class="center-title">资源借用单</label></el-col>
        <el-col :span="6" style="justify-content: flex-end;"><img src="../../../static/img/vcode.png"></el-col>
      </el-row>

      <hr class="hr-margin">

      <table border="1">
        <tr>
          <th>资源类型</th>
          <th>备注说明</th>
          <th>借用日期</th>
          <th>归还日期</th>
          <th>借用数量</th>
          <th>单位</th>
        </tr>
        <tr>
          <th>{{model.type}}</th>
          <th>{{model.remark}}</th>
          <th>{{model.borrowDate|time-format('YYYY/MM/DD')}}</th>
          <th>{{model.returnDate|time-format('YYYY/MM/DD')}}</th>
          <th>{{model.number}}</th>
          <th>{{model.unit}}</th>
        </tr>
      </table>

      <el-row class="row-margin" type="flex" justify="center" align="center">
        <el-col :span="4">备注：</el-col>
        <el-col :span="21"></el-col>
      </el-row>

      <el-row class="row-margin" type="flex" justify="center" align="center">
        <el-col :span="4">借用方：</el-col>
        <el-col :span="8">{{model.borrow}}</el-col>
        <el-col :span="4">
          <div class="col-margin">借出方：</div>
        </el-col>
        <el-col :span="8">{{model.credit}}</el-col>
      </el-row>

      <el-row class="row-margin" type="flex" justify="center" align="center">
        <el-col :span="4">接收日期：</el-col>
        <el-col :span="8" class="col-bottow"></el-col>
        <el-col :span="4">
          <div class="col-margin">出库日期：</div>
        </el-col>
        <el-col :span="8" class="col-bottow"></el-col>
      </el-row>

      <el-row class="row-margin" type="flex" justify="center" align="center">
        <el-col :span="4">接受确认：</el-col>
        <el-col :span="8" class="col-bottow"></el-col>
        <el-col :span="4">
          <div class="col-margin">出库确认：</div>
        </el-col>
        <el-col :span="8" class="col-bottow"></el-col>
      </el-row>

    </section>
    <hr>
    <el-row>
      <section class="dialog-footer">
        <el-button @click="print">打印</el-button>
      </section>
    </el-row>
  </el-dialog>
</template>
<script>
  import storage from '../../module/storage'
  export default {
    data () {
      return {
        visible: false,
        model: {
          id: '',
          category: '',
          type: '',
          borrow: '',
          credit: '',
          remark: '徐工XXXX',
          borrowDate: '2017-01-06',
          returnDate: '2017-04-06',
          number: '12',
          unit: '台'
        }
      }
    },
    mounted () {
    },
    methods: {
      show (srcData) {
        const user = storage.getUser()
        this.visible = true
        this.model.id = srcData.id
        this.model.type = srcData.typeName
        this.model.borrow = user.supplierName
        this.model.credit = srcData.supplierName
        this.model.remark = srcData.remark
        this.model.borrowDate = srcData.borrowDateTime
        this.model.returnDate = srcData.returnDateTime
        this.model.number = srcData.borrowNum
        this.model.unit = srcData.unitName
      },
      close () {
        this.visible = false
        this.model.id = ''
        this.model.category = ''
        this.model.type = ''
        this.model.borrow = ''
        this.model.credit = ''
        this.model.remark = ''
        this.model.borrowDate = ''
        this.model.returnDate = ''
        this.model.number = ''
        this.model.unit = ''
      },
      print () {
        $('#borrowPrint').print()
      }
    }
  }
</script>
<style scoped lang="scss">
  .section-border {
    border: 1px solid #9A9A9A;
    padding: .5rem
  }

  ul {
    list-style: none
  }

  .col-margin {
    margin-left: 1rem;
  }

  .row-margin {
    margin: .5rem;
  }

  .center-title {
    color: #9A9A9A;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .center {
    justify-content: center;
  }

  .hr-margin {
    margin: .8rem 0;
  }

  .col-bottow {
    border-bottom: 1px solid #9A9A9A
  }

  table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid black;
  }

  table tr th {
    background-color: #CCCCCC;
    height: 2rem;
  }

  table, th, td {
    height: 2rem;
    text-align: center
  }
</style>
