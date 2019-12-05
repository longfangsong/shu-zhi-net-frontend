import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/my'
        },
        {
            path: '/activities/:id',
            component: () => import("./views/ActivityView.vue")
        },
        {
            path: '/my',
            name: 'my',
            component: () => import("./views/My.vue"),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import("./views/Login.vue"),
        }
    ]
});
