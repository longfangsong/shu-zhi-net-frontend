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
        async mounted() {
            if (this.$store.getters.logged) {
                await this.$store.dispatch("fetchBooks");
            }
        }
    }
</script>

<style scoped>

</style>
