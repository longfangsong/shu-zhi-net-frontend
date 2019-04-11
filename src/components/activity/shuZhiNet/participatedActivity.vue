<template>
    <Activity :item="item">
        <v-card-actions class="justify-center">
            <v-btn @click="optOut" class="third" color="fourth" flat small>取消报名</v-btn>
        </v-card-actions>
    </Activity>
</template>

<script lang="ts">
    import ActivityComponent from "./activity.vue";
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Activity} from "@/store/module/activity";

    @Component({
        components: {
            Activity: ActivityComponent
        }
    })
    export default class ParticipatedActivity extends Vue {
        @Prop() private item!: Activity;

        private async optOut() {
            await this.$store.dispatch("optOut", {id: this.item.id});
        }
    }
</script>

<style scoped>

</style>
