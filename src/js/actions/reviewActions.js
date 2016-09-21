'use strict';

import dispatcher from '../dispatchers/dispatcher';

export const ACTION_TYPES = {
    ADD_REVIEW: 'ADD_ITEM',
    REMOVE_REVIEW: 'REMOVE_REVIEW'
};

export function createReview(review)
{
    dispatcher.handleAction({
        type: ACTION_TYPES.ADD_REVIEW,
        data: review
    });
}

export function removeReview(index)
{
    dispatcher.handleAction({
        type: ACTION_TYPES.REMOVE_REVIEW,
        data: index
    });
}
