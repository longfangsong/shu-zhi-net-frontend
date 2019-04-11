<template>
    <v-card class="mb-2" color="primary" hover min-height>
        <v-card-title>
            <h3 class="fourth--text">{{item.name}}</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex sm6 xs12>
                        <v-icon color="white" small>people</v-icon>
                        <span class="fourth--text">{{item.team}}</span>
                    </v-flex>
                    <v-flex md6 xs12>
                        <v-flex class="text-xs-center">
                            <v-layout class="justify-center" row>
                                <v-flex class="fourth--text line-fill-height" xs12>
                                    时间
                                    <template v-if="!showTime">：{{format(item.date,'yyyy年MM月dd日')}}</template>
                                    <v-btn @click="showTime = !showTime" color="third" fab small>
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
                            <v-layout class="pt-2" column v-if="showTime">
                                <v-flex>
                                    <v-layout class="justify-center">
                                        <v-date-picker
                                                :first-day-of-week="0"
                                                @click="showTime = false"
                                                class="fourth"
                                                color="third"
                                                locale="zh-cn"
                                                reactive
                                                readonly
                                                v-model="time"
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
    import {VolunteerActivity} from "@/store/module/volunteerActivity";
    import {format} from "date-fns";

    @Component({
        methods: {format}
    })
    export default class VolunteerActivityCard extends Vue {
        @Prop() item!: VolunteerActivity;
        private showTime = false;

        get time() {
            return format(this.item.date, "yyyy-MM-dd");
        }
    }
</script>

<style scoped>

</style>
