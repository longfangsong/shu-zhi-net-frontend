<template>
    <div>
        <ParticipatedVolunteerActivity
                :item="activity"
                v-for="activity in !$store.getters.getParticipated"
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
            if (this.$store.state.activity.activities.length === this.$store.getters.getParticipated.length) {
                await this.$store.dispatch("fetchParticipatingVolunteerActivities");
            }
        }
    }
</script>

<style scoped>

</style>
