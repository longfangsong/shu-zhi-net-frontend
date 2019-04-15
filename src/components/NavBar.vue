<template>
    <v-navigation-drawer
            v-model="open"
            app
            class="secondary"
            clipped
            fixed>
        <v-list dense>
            <v-list-tile :key="item.text" :target="item.to" :to="item.to" router v-for="item in items">
                <v-list-tile-action>
                    <v-icon class="primary--text">{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title class="primary--text" v-text="item.text"></v-list-tile-title>
            </v-list-tile>
            <v-list-group :prepend-icon="'info'">
                <template v-slot:activator>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>我的信息</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
                <v-list-tile :to="'/participated'">
                    <v-list-tile-content>
                        <v-list-tile-title>我的活动</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-icon>gavel</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile :to="'/volunteer-participated'">
                    <v-list-tile-content>
                        <v-list-tile-title>我的志愿者活动</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-icon>face</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile :to="'/library'">
                    <v-list-tile-content>
                        <v-list-tile-title>图书馆</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-icon>book</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class NavBar extends Vue {
        @Prop()
        private open!: boolean;
        private items = [
            {icon: "trending_up", text: "德", to: "/unparticipated/德"},
            {icon: "subscriptions", text: "智", to: "/unparticipated/智"},
            {icon: "history", text: "体", to: "/unparticipated/体"},
            {icon: "featured_play_list", text: "美", to: "/unparticipated/美"},
            {icon: "watch_later", text: "劳", to: "/unparticipated/劳"}
        ];
    }
</script>

<style scoped>

</style>
