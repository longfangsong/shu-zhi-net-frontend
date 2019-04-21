import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import My from "@/views/My.vue";
import ActivityView from "@/views/ActivityView.vue";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
        redirect: '/my'
        },
        {
            path: '/activities/:id',
            component: ActivityView
        },
        {
            path: '/my',
            name: 'my',
            component: My,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        }
    ]
});
