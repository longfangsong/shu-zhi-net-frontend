<template>
    <v-card class="mb-2" color="primary" hover min-height>
        <v-card-title>
            <h3 class="fourth--text">{{item.title}}</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex sm6 xs12>
                        <v-icon color="white" small>people</v-icon>
                        <span class="fourth--text">{{item.leader}}</span>
                    </v-flex>
                    <v-flex sm6 xs12>
                        <v-icon color="white" small>location_on</v-icon>
                        <span class="fourth--text">{{item.address}}</span>
                    </v-flex>
                    <v-flex md6 xs12>
                        <v-flex class="text-xs-center">
                            <v-layout class="justify-center" row>
                                <v-flex class="fourth--text line-fill-height" xs12>
                                    开始时间
                                    <template v-if="!showStartTime">：{{format(item.start_time,'yyyy年MM月dd日')}}
                                    </template>
                                    <v-btn @click="showStartTime = !showStartTime" color="third" fab small>
                                        <v-icon color="white" small>event</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <transition
                                enter-active-class="animated bounceInDown"
                                leave-active-class="animated bounceOutDown"
                                name="custom-classes-transition"
                        >
                            <v-layout class="pt-2" column v-if="showStartTime">
                                <v-flex>
                                    <v-layout class="justify-center">
                                        <v-date-picker
                                                :first-day-of-week="0"
                                                @click="showStartTime = false"
                                                class="fourth"
                                                color="third"
                                                locale="zh-cn"
                                                reactive
                                                readonly
                                                v-model="startTime"
                                        ></v-date-picker>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </transition>
                    </v-flex>
                    <v-flex md6 xs12>
                        <v-flex class="text-xs-center">
                            <v-layout class="justify-center" row>
                                <v-flex class="fourth--text line-fill-height" xs12>
                                    结束时间
                                    <template v-if="!showEndTime">：{{format(item.end_time,'yyyy年MM月dd日')}}</template>
                                    <v-btn @click="showEndTime = !showEndTime" color="third" fab small>
                                        <v-icon color="white" small>event</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <transition
                                enter-active-class="animated bounceInDown"
                                leave-active-class="animated bounceOutDown"
                                name="custom-classes-transition"
                        >
                            <v-layout class="pt-2" column v-if="showEndTime">
                                <v-flex>
                                    <v-layout class="justify-center">
                                        <v-date-picker
                                                :first-day-of-week="0"
                                                @click="showEndTime = false"
                                                class="fourth"
                                                color="third"
                                                locale="zh-cn"
                                                reactive
                                                readonly
                                                v-model="endTime"
                                        ></v-date-picker>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-center" v-if="$store.getters.logged">
            <v-btn @click="optOut" class="third" color="fourth" flat small v-if="item.participated">取消报名</v-btn>
            <v-btn @click="showTakePartDialog = true" class="third" color="fourth" flat small v-else>报名</v-btn>
        </v-card-actions>
        <v-card-actions class="justify-center" v-else>
            <v-btn class="third" color="fourth" to="/login">请先登录</v-btn>
        </v-card-actions>
        <v-dialog v-if="this.$store.getters.logged" v-model="showTakePartDialog">
            <v-card>
                <v-card-text>
                    <v-form>
                        <v-text-field @keyup.enter="takePart" label="手机号" name="phoneNumber" prepend-icon="phone"
                                      type="text" v-model="phoneNumber"></v-text-field>
                        <v-text-field @keyup.enter="takePart" label="邮箱" name="email" prepend-icon="email"
                                      type="text" v-model="email"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn :loading="loading" @click="takePart" block class="third" color="fourth">确认报名</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {format} from "date-fns";
    import {Activity} from "@/store/module/activity";

    @Component({
        methods: {
            format
        }
    })
    export default class ActivityCard extends Vue {
        @Prop() private item!: Activity;

        private showStartTime = false;

        get startTime() {
            return format(this.item.start_time, "yyyy-MM-dd");
        }

        private showEndTime = false;

        get endTime() {
            return format(this.item.start_time, "yyyy-MM-dd");
        }

        private async optOut() {
            await this.$store.dispatch("optOut", this.item);
        }

        private showTakePartDialog = false;
        private loading = false;
        private phoneNumber = "";
        private email = "";

        private async takePart() {
            this.loading = true;
            await this.$store.dispatch("takePart", {
                ...this.item,
                phone_number: this.phoneNumber,
                mail_address: this.email
            });
            this.loading = false;
            this.showTakePartDialog = false;
        }
    }
</script>

<style scoped>
    .line-fill-height {
        line-height: 40px;
    }
</style>
