<template>
    <div>
        <ParticipatedVolunteerActivity
                :item="activity"
                :key="activity.name"
                v-for="activity in $store.getters.getParticipatedVolunteer"
        ></ParticipatedVolunteerActivity>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ParticipatedVolunteerActivity from "../components/activity/volunteer/participatedVolunteerActivity.vue";

    @Component({
        components: {ParticipatedVolunteerActivity}
    })
    export default class VolunteerParticipated extends Vue {
        private async mounted() {
            if (this.$store.state.volunteerActivity.volunteerActivities.length === 0) {
                await this.$store.dispatch("fetchVolunteerActivities");
            }
            if (this.$store.getters.getParticipatedVolunteer.length === 0) {
                await this.$store.dispatch("fetchParticipatingVolunteerActivities");
            }
        }
    }
</script>

<style scoped>

</style>
