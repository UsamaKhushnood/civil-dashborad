import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import '@coreui/icons'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import FullCalendar from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.min.css'
import 'vue-search-select/dist/VueSearchSelect.css'
import VueApexCharts from 'vue-apexcharts'
import vueCountryRegionSelect from 'vue-country-region-select'
Vue.config.performance = true

Vue.component('apexchart', VueApexCharts)
Vue.use(FullCalendar)
Vue.use(CoreuiVue)
Vue.use(BootstrapVue)
Vue.use(Antd)
Vue.use(vueCountryRegionSelect)
Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App,
  },
})
