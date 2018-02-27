/**
 * Created by AprileLemon on 2017/4/9.
 */
export const errorCode = code => {
  let result = ''
  switch (code) {
    case 100000:
      result = '操作成功'
      break
    case 100001:
      result = ''
      break
    case 100002:
      result = ''
      break
    case 100003:
      result = ''
      break
    case 100004:
      result = '文件保存'
      break
    case 100005:
      result = '添加数据异常'
      break
    case 100006:
      result = 'list记录为空'
      break
    case 100007:
      result = ''
      break
    case 100008:
      result = ''
      break
    case 100050:
      result = '密码错误'
      break
    case 100051:
      result = '账号不存在'
      break
    case 100052:
      result = '验证码错误'
      break
    case 100053:
      result = '密码校验异常'
      break
    case 100054:
      result = '密码加密异常'
      break
    case 100055:
      result = '帐号名重复'
      break
    case 100056:
      result = '当前用户不是管理员'
      break
    case 200000:
      result = 'bmp子系统'
      break
    case 200006:
      result = '供应商类型名称重复'
      break
    case 200007:
      result = '供应商名称重复'
      break
    case 200008:
      result = '无法获取供应商用户'
      break
    case 200009:
      result = '当前用户没有此供应商'
      break
    case 200010:
      result = '更新占用数量异常'
      break
    case 200011:
      result = '没有当前资源'
      break
    case 200012:
      result = '没有当前资源权限'
      break
    case 200013:
      result = '更新可用数量异常'
      break
    case 200014:
      result = '更新单价异常'
      break
    case 200015:
      result = '更新数量异常'
      break
    case 200016:
      result = '更新状态异常'
      break
    case 200017:
      result = '当前数量大于可用数量'
      break
    case 200018:
      result = '当前撤场数量大于总数量'
      break
    case 200019:
      result = '无法获取资源数量'
      break
    case 200020:
      result = '当前撤场数量大于外借数量'
      break
    case 200021:
      result = '无法拒绝'
      break
    case 200022:
      result = '查询'
      break
    case 200023:
      result = '归还数量大于借用数量'
      break
    case 200024:
      result = '资源非申报中无法删除'
      break
    case 200025:
      result = '数量不正确无法借用'
      break
    case 200026:
      result = '资源类别名称重复'
      break
    case 200027:
      result = '单位名称重复'
      break
    case 200028:
      result = '资源类型名称重复'
      break
    case 200029:
      result = '供应商编号重复'
      break
    case 200030:
      result = '盘点数量小于外借数量'
      break
    case 300001:
      result = '删除文件失败'
      break
    default:
      result = '未知错误'
  }
  return result
}
