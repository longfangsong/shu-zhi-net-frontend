import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import zhHans from 'vuetify/src/locale/zh-Hans';

Vue.use(Vuetify, {
    iconfont: 'md',
    lang: {
        locales: {zhHans},
        current: 'zh-Hans'
    },
    theme: {
        primary: '#0D375F',
        secondary: '#BAD3E6',
        third: '#C50020',
        fourth: '#E1DDDD'
    }
});
