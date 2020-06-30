import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import router from './common/router/router.js'
import storage from './common/utils/storage.js'
import store from './common/store/index.js'
import settings from './common/settings.js'
import installRequest from './common/request/interceptor.js'
import { dateFormat } from './common/utils/date.js'

// 权限管理
import './common/router/permission.js'
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$router = router()
Vue.prototype.$storage = storage(settings.appName)
Vue.prototype.$store = store
Vue.prototype.$dayjs = {
	format: dateFormat
}
installRequest(Vue)

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
