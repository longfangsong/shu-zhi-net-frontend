import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Participated from '@/views/Participated.vue';
import Unparticipated from '@/views/Unparticipated.vue';
import Lao from '@/views/Lao.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/participated'
        },
        {
            path: '/unparticipated/劳',
            component: Lao
        },
        {
            path: '/unparticipated/:id',
            component: Unparticipated
        },
        {
            path: '/participated',
            name: 'participated',
            component: Participated,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        }],
});
