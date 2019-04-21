import Vue from 'vue';
import Vuex from 'vuex';
import student from './module/student';
import activity from './module/activity';
import book from './module/book';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        student,
        activity,
        book
    }
});
