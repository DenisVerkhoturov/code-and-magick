'use strict';

import dispatcher from '../dispatchers/dispatcher';
import { EventEmitter } from 'events';
import { ACTION_TYPES } from '../actions/reviewActions';

class ReviewStore extends EventEmitter
{
    constructor()
    {
        super();
        this.reviews = [];

        fetch('data/reviews.json')
            .then((response) => {
                if (response.status === 200)
                    response.json().then((data) => {
                        this.reviews = data;
                        this.emit('change');
                    });
            });
    }

    getAll()
    {
        return this.reviews;
    }

    add(review)
    {
        this.reviews.push(review);
    }

    remove(index)
    {
        this.reviews.splice(index, 1);
    }

    handleAction(action)
    {
        switch (action.type)
        {
        case ACTION_TYPES.ADD_REVIEW:
            this.add(action.data);
            reviewStore.emit('change');
            break;
        case ACTION_TYPES.REMOVE_REVIEW:
            this.remove(action.data);
            reviewStore.emit('change');
            break;
        }
    }
}

const reviewStore = new ReviewStore();
dispatcher.register(reviewStore.handleAction.bind(reviewStore));

export default reviewStore;
