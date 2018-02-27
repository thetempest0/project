import Vue from 'vue'
import storage from './storage'
Vue.directive('permission-type', {
  inserted: function (el, binding) {
    const user = storage.getUser()
    if (!user || !user.type) {
      $(el).remove()
      return
    }
    if ((parseInt(binding.value, 2) & user.type) !== user.type) {
      $(el).remove()
    }
  }
})
