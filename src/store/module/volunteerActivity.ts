import {ActionContext} from 'vuex';
import Axios from 'axios';
import partial from 'lodash.partial';
import {normalizeDateTimeInObject} from '@/tools/dateTime';

const _ = partial.placeholder;

export interface VolunteerActivity {
    readonly name: string,
    readonly date: Date,
    readonly team: string,
    readonly participated: boolean;
}

interface State {
    volunteerActivities: Array<VolunteerActivity>
}

const state: State = {
    volunteerActivities: [],
};

const mutationTypes = {
    insert: 'insert',
    delete: 'delete'
};

const mutations = {
    [mutationTypes.insert](activityState: State, payload: VolunteerActivity) {
        activityState.volunteerActivities.push(normalizeDateTimeInObject(payload));
    },
    [mutationTypes.delete](activityState: State, payload: { name: string }) {
        activityState.volunteerActivities = activityState.volunteerActivities
            .filter((activity) => activity.name !== payload.name);
    }
};

const actions = {
    async fetchVolunteerActivities({commit}: ActionContext<State, any>) {
        const response = await Axios.get('volunteer-activities');
        response.data
            .map((it: { name: string, team: string, participated: string }) => {
                return {...it, participated: false};
            })
            .map(partial(commit, mutationTypes.insert, _));
    },
    async fetchParticipatingVolunteerActivities({commit}: ActionContext<State, any>) {
        const response = await Axios.get('volunteer-activities?participating=true');
        response.data
            .map((it: { name: string, team: string, participated: string }) => {
                return {...it, participated: true};
            })
            .map(partial(commit, mutationTypes.insert, _));
    },
    async takePartVolunteer({commit, state}: ActionContext<State, any>,
                            payload: { activity_name: string }) {
        await Axios.post('volunteer-activities', payload);
    },
    async optOut({commit}: ActionContext<State, any>, payload: { activity_name: string }) {
        await Axios.delete('volunteer-activities?activity_name=' + payload.activity_name);
        commit(mutationTypes.delete, payload);
    }
};

export default {
    state,
    mutations,
    actions
};
