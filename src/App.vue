<template>
    <v-app class="secondary" id="inspire">
        <NavBar :open="openNavBar"></NavBar>
        <v-toolbar
                app
                clipped-left
                color="primary"
                dense
                fixed
        >
            <v-toolbar-side-icon @click="openNavBar = !openNavBar" class="fourth--text">
                <v-icon>list</v-icon>
            </v-toolbar-side-icon>
            <v-toolbar-title class="mr-5 align-center">
                <span class="title fourth--text">
                    {{URL_CHINESE_MAP.get($router.currentRoute.path)}}
                </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="subheading fourth--text">
                {{$store.getters.studentName.getOrElse("请先登录")}}
            </span>
            <v-btn class="third fourth--text" small to="/login" v-if="!$store.getters.logged">
                登录
            </v-btn>
            <v-btn @click="logout" class="third fourth--text" small v-else>
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
    import NavBar from "@/components/NavBar.vue";

    @Component({
        components: {NavBar}
    })
    export default class App extends Vue {
        private openNavBar = true;

        private URL_CHINESE_MAP = new Map([
            ["/participated", "我的活动"],
            ["/volunteer-participated", "我的志愿者活动"],
            ["/unparticipated/德", "德"],
            ["/unparticipated/智", "智"],
            ["/unparticipated/体", "体"],
            ["/unparticipated/美", "美"],
            ["/unparticipated/劳", "劳"],
            ["/login", "登录"],
            ["/home", "首页"],
            ["/library", "图书馆"],
        ]);

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
