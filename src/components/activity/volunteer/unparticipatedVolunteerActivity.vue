<template>
    <VolunteerActivityCard :item="item">
        <v-card-actions class="justify-center">
            <v-btn @click="takePart" class="third" color="fourth" flat small>报名</v-btn>
        </v-card-actions>
    </VolunteerActivityCard>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {VolunteerActivity} from "@/store/module/volunteerActivity";
    import VolunteerActivityCard from "@/components/activity/volunteer/volunteerActivityCard.vue";

    @Component({
        components: {
            VolunteerActivityCard
        }
    })
    export default class UnparticipatedActivity extends Vue {
        @Prop() private item!: VolunteerActivity;
        private loading = false;

        private async takePart() {
            this.loading = true;
            await this.$store.dispatch("takePartVolunteer", {
                activity_name: this.item.name
            });
            this.loading = false;
        }
    }
</script>

<style scoped>

</style>
