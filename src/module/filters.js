/**
 * Created by a on 2016/9/22.
 */
import Vue from 'vue'
import dateFns from 'date-fns'
Vue.filter('time-format', function (value, format) {
  let dateTime = ''
  try {
    dateTime = dateFns.format(value, format)
  } catch (ex) {
    console.error(ex)
  }
  if (dateTime === 'Invalid Date') {
    return ''
  }
  return dateTime
})
