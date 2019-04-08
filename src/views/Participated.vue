<template>
    <div>
        <h1 v-if="!$store.getters.logged">请先登录</h1>
        <div v-else>
            <ParticipatedActivity :item="activity"
                                  :key="activity.id"
                                  v-for="activity in $store.getters.getParticipated">
            </ParticipatedActivity>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ParticipatedActivity from "@/components/activity/participatedActivity.vue";

    @Component({
        components: {ParticipatedActivity},
    })
    export default class Participated extends Vue {
        private async mounted() {
            if (this.$store.getters.logged) {
                await this.$store.dispatch("fetchParticipatingActivities");
            }
        }
    }
</script>
