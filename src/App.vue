<template>
    <v-app class="red lighten-5" id="inspire">
        <v-navigation-drawer
                app
                class="red"
                clipped
                fixed
                v-model="drawer">
            <v-list dense>
                <v-list-tile :key="item.text" :target="item.to" :to="item.to" router v-for="item in items">
                    <v-list-tile-action>
                        <v-icon class="yellow--text">{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="yellow--text" v-text="item.text"></v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                app
                clipped-left
                color="red darken-4"
                dense
                fixed
        >
            <v-toolbar-side-icon @click="drawer = !drawer" class="yellow--text">
                <v-icon>list</v-icon>
            </v-toolbar-side-icon>
            <v-toolbar-title class="mr-5 align-center">
                <span class="title yellow--text">
                    {{URL_CHINESE_MAP.get($router.currentRoute.path)}}
                </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="subheading yellow--text">
                {{$store.getters.studentName.getOrElse("请先登录")}}
            </span>
            <v-btn class="yellow lighten-1" small to="/login" v-if="!$store.getters.logged">
                登录
            </v-btn>
            <v-btn @click="logout" class="yellow lighten-1" small v-else>
                注销
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fill-height>
                <v-flex>
                    <router-view></router-view>
                </v-flex>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class App extends Vue {
        private URL_CHINESE_MAP = new Map([
            ["/participated", "我的活动"],
            ["/unparticipated/德", "德"],
            ["/unparticipated/智", "智"],
            ["/unparticipated/体", "体"],
            ["/unparticipated/美", "美"],
            ["/unparticipated/劳", "劳"],
            ["/login", "登录"],
            ["/home", "首页"]
        ]);
        private items = [
            {icon: "trending_up", text: "德", to: "/unparticipated/德"},
            {icon: "subscriptions", text: "智", to: "/unparticipated/智"},
            {icon: "history", text: "体", to: "/unparticipated/体"},
            {icon: "featured_play_list", text: "美", to: "/unparticipated/美"},
            {icon: "watch_later", text: "劳", to: "/unparticipated/劳"},
            {icon: "watch_later", text: "我的活动", to: "/participated"},
        ];
        private drawer = null;

        private async mounted() {
            if (!this.$store.getters.logged) {
                await this.$store.dispatch("restoreLogin");
                if (this.$store.getters.logged) {
                    this.$router.push("/");
                } else {
                    this.$router.push("/login");
                }
            }
        }

        private async logout() {
            await this.$store.dispatch("logout");
        }
    }
</script>
