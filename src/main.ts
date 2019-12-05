import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import store from './store';
import Axios from 'axios';
// @ts-ignore
import VueOverwatchLoading from 'vue-overwatch-loading';

Axios.defaults.baseURL = process.env.VUE_APP_BACKEND_ADDRESS || 'https://cloud.shuosc.com';
Vue.config.productionTip = false;
Vue.use(VueOverwatchLoading);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
