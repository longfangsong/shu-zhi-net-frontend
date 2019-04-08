<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card color="red darken-2" hover min-height>
                    <v-card-title>
                        <span class="caption yellow--text">{{item.title}}</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-icon color="white" small>people</v-icon>
                        <span class="caption yellow--text">{{item.leader}}</span>
                        <v-icon color="white" small>location_on</v-icon>
                        <span class="caption yellow--text">{{item.address}}</span>
                    </v-card-text>
                    <v-card-actions>
                        <v-flex>
                            <v-icon color="white" small>timer</v-icon>
                            <span class="caption yellow--text">报名时间: {{format(item.sign_up_time,'yyyy年MM月dd日')}}</span>
                        </v-flex>
                    </v-card-actions>
                    <v-card-actions>
                        <v-flex>
                            <v-icon color="white" small>access_time</v-icon>
                            <span class="caption yellow--text">开始时间: {{format(item.start_time,'yyyy年MM月dd日')}}</span>
                        </v-flex>
                    </v-card-actions>
                    <v-card-actions>
                        <v-flex>
                            <v-icon color="white" small>timer</v-icon>
                            <span class="caption yellow--text">结束时间: {{format(item.end_time,'yyyy年MM月dd日')}}</span>
                        </v-flex>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <slot></slot>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
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
    }
</script>

<style scoped>

</style>
