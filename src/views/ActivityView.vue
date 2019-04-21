<template>
    <v-container>
        <vue-overwatch-loading :Radius="45" Color="#ffff66"
                               class="loading"
                               v-if="$store.state.activity.activities.length === 0">

        </vue-overwatch-loading>
        <ActivityCard :item="item" :key="item.id"
                      v-for="item in $store.getters.getActivitiesForType($route.params.id)">
        </ActivityCard>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import FetchActivityRequired from "@/mixins/FetchActivityRequired";
    import ActivityCard from "@/components/activity/activityCard.vue";

    @Component({
        components: {ActivityCard},
        mixins: [FetchActivityRequired]
    })
    export default class ActivityView extends Vue {

    }
</script>

<style scoped>

</style>
