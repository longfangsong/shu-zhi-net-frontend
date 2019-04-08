<template>
    <div>
        <h1 v-if="!$store.getters.logged">请先登录</h1>
        <div v-else>
            <UnparticipatedActivity
                    :item="item"
                    :key="item.id"
                    v-for="item in $store.getters.getActivitiesForType($route.params.id)">
            </UnparticipatedActivity>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import UnparticipatedActivity from "@/components/activity/unparticipatedActivity.vue";
    import {frontendTypeIdToBackendTypeId} from "@/store/module/activity";

    @Component({
        components: {
            UnparticipatedActivity
        }
    })
    export default class Unparticipated extends Vue {
        private frontendTypeIdToBackendTypeId = frontendTypeIdToBackendTypeId;

        private async mounted() {
            if (this.$store.getters.logged &&
                this.$store.state.activity.activities.length === this.$store.getters.getParticipated.length) {
                await this.$store.dispatch("fetchActivities");
            }
        }
    }
</script>

<style scoped>

</style>
