<template>
    <div>
        <BookCard
                :item="book"
                :key="book.description"
                v-for="book in $store.state.book.books"></BookCard>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import BookCard from "@/components/book/BookCard.vue";

    @Component({
        components: {BookCard}
    })
    export default class Books extends Vue {
        private async mounted() {
            setTimeout(async () => {
                if (this.$store.getters.logged) {
                    await this.$store.dispatch("fetchBooks");
                }
            }, 500);
        }
    }
</script>

<style scoped>

</style>
