<template>
    <Activity :item="item">
        <v-card-actions class="justify-center">
            <v-btn @click="showTakePartDialog = true" color="yellow" flat small>报名</v-btn>
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
                    <v-btn :loading="loading" @click="takePart" block color="primary">确认报名</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </Activity>
</template>

<script lang="ts">
    import ActivityComponent from "./activity.vue";
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Activity} from "@/store/module/activity";

    @Component({
        components: {
            Activity: ActivityComponent
        }
    })
    export default class UnparticipatedActivity extends Vue {
        @Prop() private item!: Activity;
        private showTakePartDialog = false;
        private loading = false;
        private phoneNumber = "";
        private email = "";

        private async takePart() {
            this.loading = true;
            await this.$store.dispatch("takePart", {
                activity_id: this.item.id,
                phone_number: this.phoneNumber,
                mail_address: this.email
            });
            this.loading = false;
            this.showTakePartDialog = false;
        }
    }
</script>

<style scoped>

</style>
