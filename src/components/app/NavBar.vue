<template>
    <v-list dense>
        <v-list-tile :key="item.text" :target="item.to" :to="item.to" router v-for="item in items">
            <v-list-tile-action>
                <v-icon class="primary--text">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="primary--text" v-text="item.text"></v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class NavBar extends Vue {
        private items = [
            {icon: "trending_up", text: "德", to: "/activities/德"},
            {icon: "subscriptions", text: "智", to: "/activities/智"},
            {icon: "history", text: "体", to: "/activities/体"},
            {icon: "featured_play_list", text: "美", to: "/activities/美"},
            {icon: "watch_later", text: "劳", to: "/activities/劳"},
            {icon: "face", text: "我的", to: "/my"}
        ];
    }
</script>

<style scoped>

</style>
