<template>
    <div>
        <vue-overwatch-loading :Radius="45" Color="#ffff66"
                               class="loading"
                               v-if="$store.state.activity.activities.length === 0"></vue-overwatch-loading>
        <UnparticipatedActivity
                :item="item"
                :key="item.id"
                v-for="item in $store.getters.getActivitiesForType('劳')"
                v-if="$store.getters.logged">
        </UnparticipatedActivity>
        <Activity :item="item" :key="item.id"
                  v-else
                  v-for="item in $store.getters.getActivitiesForType($route.params.id)">
            <v-card-actions class="justify-center">
                <v-btn class="third" color="fourth" to="/login">请先登录</v-btn>
            </v-card-actions>
        </Activity>
        <UnparticipatedVolunteerActivity
                :item="item"
                :key="item.id"
                v-for="item in $store.state.volunteerActivity.volunteerActivities"
                v-if="$store.getters.logged">
        </UnparticipatedVolunteerActivity>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import UnparticipatedActivity from "@/components/activity/shuZhiNet/unparticipatedActivity.vue";
    import UnparticipatedVolunteerActivity from "@/components/activity/volunteer/unparticipatedVolunteerActivity.vue";
    import ParticipatedVolunteerActivity from "@/components/activity/volunteer/participatedVolunteerActivity.vue";
    import Activity from "@/components/activity/shuZhiNet/activity.vue";

    @Component({
        components: {
            UnparticipatedActivity,
            Activity,
            UnparticipatedVolunteerActivity,
            ParticipatedVolunteerActivity
        }
    })
    export default class Lao extends Vue {
        private async mounted() {
            if (this.$store.state.activity.activities.length === this.$store.getters.getParticipated.length) {
                await this.$store.dispatch("fetchActivities");
                await this.$store.dispatch("fetchVolunteerActivities");
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .loading {
        display flex
        justify-content center
    }
</style>
