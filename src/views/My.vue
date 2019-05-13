<template>
    <v-tabs
            :grow="true"
            color="third"
            dark
            fill-height
            icons-and-text
            slider-color="secondary"
    >
        <v-tab ripple>
            活动
            <v-badge left>
                <template v-slot:badge>
                    <span v-if="$store.getters.logged">{{$store.getters.getParticipated.length}}</span>
                </template>
                <v-icon>
                    local_activity
                </v-icon>
            </v-badge>
        </v-tab>
        <v-tab ripple>
            图书馆
            <v-badge left>
                <template v-slot:badge>
                    <span v-if="$store.getters.logged">{{$store.state.book.books.length}}</span>
                </template>
                <v-icon>
                    local_library
                </v-icon>
            </v-badge>
        </v-tab>
        <v-tab ripple>
            下载
            <v-badge left>
                <template v-slot:badge>
                    <span v-if="$store.getters.logged">{{$store.state.book.books.length}}</span>
                </template>
                <v-icon>
                    cloud_download
                </v-icon>
            </v-badge>
        </v-tab>
        <v-tab-item>
            <ParticipatingActivities></ParticipatingActivities>
        </v-tab-item>
        <v-tab-item>
            <Books></Books>
        </v-tab-item>
        <v-tab-item>
            <Download></Download>
        </v-tab-item>
    </v-tabs>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ParticipatingActivities from "@/components/myInfo/ParticipatingActivities.vue";
    import Books from "@/components/myInfo/Books.vue";
    import Download from "@/components/myInfo/Download.vue";

    @Component({
        components: {Download, Books, ParticipatingActivities},
    })
    export default class My extends Vue {
    }
</script>

<style scoped>

</style>
