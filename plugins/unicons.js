import Vue from 'vue'
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import {
  uniAngleUp as AngleUpIcon,
  uniAngleDown as AngleDownIcon,
  uniArrowLeft as ArrowLeftIcon
} from 'vue-unicons/dist/icons'

Unicon.add([AngleUpIcon, AngleDownIcon, ArrowLeftIcon])
Vue.use(Unicon)