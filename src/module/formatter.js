/**
 * Created by Administrator on 2017/4/2.
 */
class Formatter {
  static resourceStatus (row, column) {
    switch (row.status) {
      case '1':
        return '申报中'
      case '2':
        return '已入场'
      case '3':
        return '盘点中'
      case '4':
        return '撤场中'
      case '5':
        return '已撤场'
      case '6':
        return '已关闭'
    }
  }

  static billStatus (row, column) {
    switch (row.status) {
      case '1':
        return '待审核'
      case '2':
        return '待归还'
      case '3':
        return '已归还'
      case '4':
        return '已关闭'
      case '5':
        return '归还中'
    }
  }
}
export default Formatter
