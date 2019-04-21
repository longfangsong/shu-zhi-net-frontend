<template>
    <v-app class="secondary" id="inspire">
        <v-navigation-drawer
                app
                class="secondary"
                clipped
                fixed
                v-model="openNavBar">
            <NavBar></NavBar>
        </v-navigation-drawer>
        <v-toolbar
                app
                clipped-left
                color="primary"
                dense
                fixed>
            <v-toolbar-side-icon @click="openNavBar = !openNavBar" class="fourth--text">
                <!--                <v-icon>list</v-icon>-->
                <img class="logo" src="../src/assets/logo.png">
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
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import NavBar from "@/components/app/NavBar.vue";

    @Component({
        components: {NavBar}
    })
    export default class App extends Vue {
        private openNavBar = true;

        private URL_CHINESE_MAP = new Map([
            ["/activities/德", "德"],
            ["/activities/智", "智"],
            ["/activities/体", "体"],
            ["/activities/美", "美"],
            ["/activities/劳", "劳"],
            ["/login", "登录"],
            ["/home", "首页"],
            ["/my", "我的"],
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

<style>
    .logo {
        width: 30px;
        height: 30px;
    }
</style>
