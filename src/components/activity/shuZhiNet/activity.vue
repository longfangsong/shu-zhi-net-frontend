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
        <slot></slot>
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
    export default class ActivityComponent extends Vue {
        @Prop() private item!: Activity;

        private showStartTime = false;

        get startTime() {
            return format(this.item.start_time, "yyyy-MM-dd");
        }

        private showEndTime = false;

        get endTime() {
            return format(this.item.start_time, "yyyy-MM-dd");
        }
    }
</script>

<style scoped>
    .line-fill-height {
        line-height: 40px;
    }
</style>
