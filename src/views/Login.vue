<template>
    <v-card class="elevation-8">
        <v-card-text>
            <v-form>
                <v-text-field @keyup.enter="login"
                              label="一卡通账号"
                              name="username"
                              prepend-icon="person"
                              type="text"
                              v-model="username"></v-text-field>
                <v-text-field @keyup.enter="login"
                              label="密码"
                              name="password"
                              prepend-icon="lock"
                              type="password"
                              v-model="password"></v-text-field>
            </v-form>
            <v-dialog v-model="errorLogin" width="500">
                <v-card>
                    <v-card-text>
                        学号或密码错误，请重试
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn @click="errorLogin = false " block class="third fourth--text">
                            确定
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card-text>
        <v-card-actions>
            <v-btn :disabled="loading" :loading="loading" @click="login" block class="third fourth--text">登录</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Login extends Vue {
        private username = "";
        private password = "";
        private loading = false;
        private errorLogin = false;

        public async login() {
            await this.$store.dispatch("login", {username: this.username, password: this.password});
            this.$router.push("/");
        }
    };
</script>

<style scoped>

</style>
