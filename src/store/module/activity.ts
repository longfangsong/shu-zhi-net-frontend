import {ActionContext} from 'vuex';
import {normalizeDateTimeInObject} from '@/tools/dateTime';
import Axios from 'axios';
import partial from 'lodash.partial';
import {findFirst, findIndex} from 'fp-ts/lib/Array';

const _ = partial.placeholder;

export interface Activity {
    readonly id: string,
    readonly type_id: string,
    readonly title: string,
    readonly leader: string,
    readonly address: string,
    readonly start_time: Date,
    readonly end_time: Date,
    readonly sign_up_time: Date
}

export interface ParticipatedActivity extends Activity {
    participate_info_id: string
}

export function isParticipated(activity: Activity): activity is ParticipatedActivity {
    return activity.hasOwnProperty('participate_info_id');
}

export const frontendTypeIdToBackendTypeId = new Map<string, Array<string>>([
    ['德', ['2', '3', '4']],
    ['智', ['1', '5']],
    ['体', ['6']],
    ['美', ['7']],
    ['劳', ['8']],
]);

interface State {
    activities: Array<Activity>;
}

const state: State = {
    activities: [],
};

const getters = {
    getActivitiesForType(activityState: State): (frontendType: string) => Array<Activity> {
        return (frontendType: string) =>
            activityState.activities.filter(
                (activity) => frontendTypeIdToBackendTypeId.get(frontendType)!.indexOf(activity.type_id) !== -1);
    },
    getParticipated(activityState: State): Array<ParticipatedActivity> {
        return activityState.activities.filter(isParticipated);
    }
};

const mutationTypes = {
    upsert: 'upsert',
    delete: 'delete'
};

const mutations = {
    [mutationTypes.upsert](activityState: State, payload: Activity) {
        const activity = normalizeDateTimeInObject(payload);
        const alreadyInIndex = findIndex(activityState.activities, (it) => it.id === payload.id);
        if (alreadyInIndex.isSome()) {
            activityState.activities.splice(alreadyInIndex.toNullable() as number, 1, activity);
        } else {
            activityState.activities.push(activity);
        }
    },
    [mutationTypes.delete](activityState: State, payload: { id: string }) {
        activityState.activities = activityState.activities.filter((activity) => activity.id !== payload.id);
    }
};

const actions = {
    async fetchActivities({commit}: ActionContext<State, any>) {
        const response = await Axios.get('/api/activities');
        response.data.map(partial(commit, mutationTypes.upsert, _));
    },
    async fetchParticipatingActivities({commit}: ActionContext<State, any>) {
        const response = await Axios.get('/api/activities?participating=true');
        response.data.map(partial(commit, mutationTypes.upsert, _));
    },
    async takePart({commit, state}: ActionContext<State, any>,
                   payload: { activity_id: string, phone_number: string, mail_address: string }
    ) {
        await Axios.post('/api/activities', payload);
        const theActivity = findFirst(state.activities, (activity: Activity) => activity.id === payload.activity_id);
        commit(mutationTypes.upsert, {...theActivity, participate_info_id: null});
    },
    async optOut({commit}: ActionContext<State, any>, payload: { id: string }) {
        await Axios.delete('/api/activities?id=' + payload.id);
        commit(mutationTypes.delete, payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
