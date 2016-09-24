'use strict';

import dispatcher from '../dispatchers/dispatcher';

export const ACTIONS = {
    ADD: 'ADD_ITEM',
    REMOVE: 'REMOVE_REVIEW',
    FILTER: 'FILTER'
};

export function create(review) {
    dispatcher.handleAction({
        type: ACTIONS.ADD,
        data: review
    });
}

export function remove(index) {
    dispatcher.handleAction({
        type: ACTIONS.REMOVE,
        data: index
    });
}

export function filter(index) {
    dispatcher.handleAction({
        type: ACTIONS.FILTER,
        data: index
    });
}
