import {ActionContext} from 'vuex';
import Axios from 'axios';
import partial from 'lodash.partial';
import {normalizeDateTimeInObject} from '@/tools/dateTime';
import {findIndex} from 'fp-ts/lib/Array';

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

const getters = {
    getParticipatedVolunteer(activityState: State): Array<VolunteerActivity> {
        return activityState.volunteerActivities.filter((it) => it.participated);
    }
};

const state: State = {
    volunteerActivities: [],
};

const mutationTypes = {
    upsert: 'volunteer_upsert',
    delete: 'volunteer_delete'
};

const mutations = {
    [mutationTypes.upsert](activityState: State, payload: VolunteerActivity) {
        const alreadyInIndex = findIndex(activityState.volunteerActivities, (it) => it.name === payload.name);
        if (alreadyInIndex.isNone()) {
            activityState.volunteerActivities.push(normalizeDateTimeInObject(payload));
        } else {
            activityState.volunteerActivities.splice(alreadyInIndex.toNullable() as number, 1, payload);
        }
    },
    [mutationTypes.delete](activityState: State, payload: { name: string }) {
        activityState.volunteerActivities = activityState.volunteerActivities
            .filter((activity) => activity.name !== payload.name);
    }
};

const actions = {
    async fetchVolunteerActivities({commit}: ActionContext<State, any>) {
        const response = await Axios.get('/api/volunteer-activities');
        response.data
            .map((it: { name: string, team: string, participated: string }) => {
                return {...it, participated: false};
            })
            .map(partial(commit, mutationTypes.upsert, _));
    },
    async fetchParticipatingVolunteerActivities({commit, state}: ActionContext<State, any>) {
        const response = await Axios.get('/api/volunteer-activities?participating=true');
        response.data
            .map((name: string) => {
                const object = {
                    ...state.volunteerActivities.find((it) => it.name === name),
                    participated: true
                };
                return object;
            })
            .map(partial(commit, mutationTypes.upsert, _));
    },
    async takePartVolunteer({commit, state}: ActionContext<State, any>,
                            payload: { activity_name: string }) {
        await Axios.post('/api/volunteer-activities', payload);
    },
    async optOutVolunteer({commit}: ActionContext<State, any>, payload: { activity_name: string }) {
        await Axios.delete('/api/volunteer-activities?activity_name=' + payload.activity_name);
        commit(mutationTypes.delete, payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
