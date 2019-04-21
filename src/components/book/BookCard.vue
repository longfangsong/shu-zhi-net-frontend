<template>
    <v-card class="mb-2" color="primary" hover min-height>
        <v-card-title>
            <h3 class="fourth--text">{{item.description}}</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex sm6 xs12>
                        <v-icon color="white" small>people</v-icon>
                        <span class="fourth--text">{{item.author}}</span>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Book} from "@/store/module/book";

    @Component
    export default class BookCard extends Vue {
        @Prop() item!: Book;
    }
</script>

<style scoped>

</style>
