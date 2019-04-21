<template>
    <div>
        <vue-overwatch-loading :Radius="45" Color="#ffff66"
                               class="loading"
                               v-if="$store.state.activity.activities.length === 0"></vue-overwatch-loading>
        <h1 v-if="!$store.getters.logged">请先登录</h1>
        <div v-else>
            <ActivityCard :item="activity"
                          :key="activity.id"
                          v-for="activity in $store.getters.getParticipated">
            </ActivityCard>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ActivityCard from "@/components/activity/activityCard.vue";
    import FetchActivityRequired from "@/mixins/FetchActivityRequired";

    @Component({
        components: {
            ActivityCard,
        },
        mixins: [FetchActivityRequired]
    })
    export default class ParticipatingActivities extends Vue {
    }
</script>

<style lang="stylus" scoped>
    .loading {
        display flex
        justify-content center
    }
</style>
