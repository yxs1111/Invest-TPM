/*
 * @Description:
 * @Date: 2021-12-08 19:27:05
 * @LastEditTime: 2022-10-31 17:42:12
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/font.scss'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import i18n from './lang'
import VCalendar from 'v-calendar'; // 引入日历插件

Vue.use(VCalendar, {
  componentPrefix: 'vc',
});
/**
 * 富文本编辑器
 */
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodeMirror)

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
VXETable.use(VXETablePluginElement)
Vue.use(VXETable)
Vue.use(VWave)
// 设置所有Dialog，在点击空白处时不关闭
ElementUI.Dialog.props.closeOnClickModal = false
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
})
let ganttState, ganttInstance
app.$on('gantt-elastic-ready', ganttElasticInstance => {
  ganttInstance = ganttElasticInstance
  ganttState = ganttElasticInstance.state
  ganttInstance.$on('chart-task-click', ({ event, data }) => {
    //点击task 切换 当前Task
    // console.log('task list clicked! (chart)', { event, data });
    app.$emit('changeActive', data.parentId)
    app.$emit('isActiveId', data.parentId)
  })
 ganttInstance.$on('chart-task-mouseenter', ({ event, data }) => {
    console.log(data);
    app.$emit('taskMouseEnter', { event, data })
  })
  ganttInstance.$on('chart-task-mouseout', ({ event, data }) => {
    // console.log('task list mouseout! (chart)', { event, data });
    app.$emit('taskMouseout', { event, data })
  })
})
//监听更改CurrentTask
app.$on('changeActive',data=>{
  // console.log(data);
  app.$emit('currentMonthChange',data)
})
