import {findIndex} from "fp-ts/lib/Array";
import {ActionContext} from "vuex";
import Axios from "axios";
import partial from 'lodash.partial';

const _ = partial.placeholder;

export interface Book {
    readonly description: string,
    readonly author: string
}

interface State {
    books: Array<Book>;
}


const state: State = {
    books: [],
};

const mutationTypes = {
    upsert: 'book_upsert'
};

const mutations = {
    [mutationTypes.upsert](bookState: State, payload: Book) {
        const alreadyInIndex = findIndex(bookState.books, (book) => book.description === payload.description);
        if (alreadyInIndex.isSome()) {
            bookState.books.splice(alreadyInIndex.toNullable()!, 1, payload);
        } else {
            bookState.books.push(payload);
        }
    },
};

const actions = {
    async fetchBooks({commit}: ActionContext<State, any>) {
        const response = await Axios.get('/api/library/histories');
        response.data.histories.map(partial(commit, mutationTypes.upsert, _));
    }
};

export default {
    state,
    mutations,
    actions
}
