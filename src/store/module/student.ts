import {none, Option, some} from 'fp-ts/lib/Option';
import Axios from 'axios';
import {ActionContext} from 'vuex';

export interface Student {
    readonly username: string,
    readonly name: string
}

interface State {
    student: Option<Student>
}

const state: State = {
    student: none,
};

const getters = {
    logged(studentState: State): boolean {
        return studentState.student!.isSome();
    },
    studentName(studentState: State): Option<string> {
        return studentState.student!.map((it) => it.name);
    },
    username(studentState: State) {
        return studentState.student!.map((it) => it.username);
    }
};

const mutationTypes = {
    setStudent: 'setStudent'
};

const mutations = {
    [mutationTypes.setStudent](studentState: State, student: Student) {
        studentState.student = some(student);
    }
};

const actions = {
    async login({commit}: ActionContext<State, any>, payload: { username: string, password: string }) {
        const [response] = await Promise.all(['shu-zhi-net', 'volunteer', 'library']
            .map((it) => Axios.post('/auth/login/' + it, {
                username: payload.username,
                password: payload.password
            })));
        commit(mutationTypes.setStudent, {
            name: response.data.student_name,
            username: payload.username
        });
        localStorage.setItem('name', response.data.student_name);
        localStorage.setItem('username', payload.username);
        localStorage.setItem('token', response.data.token);
        Axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
    },
    async logout({commit}: ActionContext<State, any>) {
        commit(mutationTypes.setStudent, none);
        Axios.defaults.headers.common.Authorization = '';
        localStorage.removeItem('name');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        window.location.reload();
    },
    async restoreLogin({commit}: ActionContext<State, any>) {
        const name = localStorage.getItem('name');
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        if (name !== null && token !== null) {
            commit(mutationTypes.setStudent, {
                name,
                username
            });
            Axios.defaults.headers.common.Authorization = 'Bearer ' + token;
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
