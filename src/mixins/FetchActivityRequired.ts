import {Component, Vue} from "vue-property-decorator";

@Component
export default class FetchActivityRequired extends Vue {
    protected async mounted() {
        setTimeout(async () => {
            if (this.$store.getters.logged && this.$store.state.activity.activities.length === 0) {
                await this.$store.dispatch("fetchActivities");
                await this.$store.dispatch("fetchParticipatingActivities");
            }
        }, 500)
    }
}
