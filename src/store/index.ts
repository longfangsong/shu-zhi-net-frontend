import Vue from 'vue';
import Vuex from 'vuex';
import student from './module/student';
import activity from './module/activity';
import volunteerActivity from './module/volunteerActivity';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        student,
        activity,
        volunteerActivity
    }
});
