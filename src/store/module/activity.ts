import {normalizeDateTimeInObject} from "@/tools/dateTime";
import {findFirst, findIndex} from "fp-ts/lib/Array";
import {ActionContext} from "vuex";
import Axios from "axios";
import partial from 'lodash.partial';

const _ = partial.placeholder;

enum ActivitySource {
    shuZhiNet,
    volunteerNet
}

export const ActivityToSourceURL = new Map<ActivitySource, string>([
    [ActivitySource.shuZhiNet, '/api/shu-zhi-net/activities'],
    [ActivitySource.volunteerNet, '/api/volunteer/activities'],
]);

export interface Activity {
    readonly id: string,
    readonly type_id: string,
    readonly title: string,
    readonly leader: string,
    readonly address: string,
    readonly start_time: Date,
    readonly end_time: Date,
    readonly sign_up_time: Date,
    readonly participated: boolean,
    readonly from_source: ActivitySource
}

interface State {
    activities: Array<Activity>;
}

const state: State = {
    activities: [],
};

export const frontendTypeIdToShuZhiNetTypeId = new Map<string, Array<string>>([
    ['德', ['2', '3', '4']],
    ['智', ['1', '5']],
    ['体', ['6']],
    ['美', ['7']],
    ['劳', ['8']],
]);

const getters = {
    getActivitiesForType(activityState: State): (frontendType: string) => Array<Activity> {
        return (frontendType: string) => {
            const isThisType = (activity: Activity) =>
                frontendTypeIdToShuZhiNetTypeId.get(frontendType)!.indexOf(activity.type_id) !== -1;
            const fromShuZhiNet = activityState.activities.filter(isThisType);
            if (frontendType === "劳") {
                const isFromVolunteer = (activity: Activity) => activity.from_source === ActivitySource.volunteerNet;
                const fromVolunteer = activityState.activities.filter(isFromVolunteer);
                return fromShuZhiNet.concat(fromVolunteer);
            } else {
                return fromShuZhiNet
            }
        };
    },
    getParticipated(activityState: State): Array<Activity> {
        return activityState.activities.filter((activity) => activity.participated);
    }
};

const mutationTypes = {
    upsert: 'activity_upsert',
    delete: 'activity_delete'
};

const mutations = {
    [mutationTypes.upsert](activityState: State, payload: Activity) {
        const activity = normalizeDateTimeInObject(payload);
        const alreadyInIndex = findIndex(activityState.activities, (it) => it.id === payload.id);
        if (alreadyInIndex.isSome()) {
            activityState.activities.splice(alreadyInIndex.toNullable()!, 1, activity);
        } else {
            activityState.activities.push(activity);
        }
    },
    [mutationTypes.delete](activityState: State, payload: { id: string }) {
        activityState.activities = activityState.activities.filter((activity) => activity.id !== payload.id);
    }
};

function addParticipateInfo(it: Activity, participated: boolean): Activity {
    return {
        ...it,
        participated
    }
}

function addFromSourceInfo(it: Activity, fromSource: ActivitySource): Activity {
    return {
        ...it,
        from_source: fromSource
    }
}

const actions = {
    async fetchActivities({commit}: ActionContext<State, any>) {
        for (const [source, sourceURL] of ActivityToSourceURL) {
            const response = await Axios.get(sourceURL);
            response.data
                .map(partial(addParticipateInfo, _, false))
                .map(partial(addFromSourceInfo, _, source))
                .map(partial(commit, mutationTypes.upsert, _));
        }
    },
    async fetchParticipatingActivities({commit}: ActionContext<State, any>) {
        for (const [source, sourceURL] of ActivityToSourceURL) {
            const response = await Axios.get(sourceURL + '?participating=true');
            response.data
                .map(partial(addParticipateInfo, _, true))
                .map(partial(addFromSourceInfo, _, source))
                .map(partial(commit, mutationTypes.upsert, _));
        }
    },
    async takePart({commit, state}: ActionContext<State, any>,
                   payload: { id: string, phone_number?: string, mail_address?: string }) {
        findFirst(state.activities, (it) => it.id === payload.id)
            .map(async (activity) => {
                await Axios.post(ActivityToSourceURL.get(activity.from_source)!, payload);
                commit(mutationTypes.upsert, addParticipateInfo(activity, true));
            })
    },
    async optOut({commit}: ActionContext<State, any>, payload: { id: string }) {
        findFirst(state.activities, (it) => it.id === payload.id)
            .map(async (activity) => {
                await Axios.delete(ActivityToSourceURL.get(activity.from_source) + '?id=' + payload.id);
                commit(mutationTypes.upsert, addParticipateInfo(activity, false));
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
