<template>
    <VolunteerActivityCard :item="item">
        <v-card-actions class="justify-center">
            <v-btn @click="optOut" class="third" color="fourth" flat small>取消报名</v-btn>
        </v-card-actions>
    </VolunteerActivityCard>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import VolunteerActivityCard from "@/components/activity/volunteer/volunteerActivityCard.vue";
    import {VolunteerActivity} from "@/store/module/volunteerActivity";

    @Component({
        components: {
            VolunteerActivityCard
        }
    })
    export default class ParticipatedActivity extends Vue {
        @Prop() private item!: VolunteerActivity;

        private async optOut() {
            await this.$store.dispatch("optOutVolunteer", {activity_name: this.item.name});
        }
    }
</script>

<style scoped>

</style>
