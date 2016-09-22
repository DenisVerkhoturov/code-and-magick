'use strict';

import dispatcher from '../dispatchers/dispatcher';
import { EventEmitter } from 'events';

class PhotoStore extends EventEmitter
{
    constructor() {
        super();
        this.photos = [];

        fetch('data/photos.json')
            .then((response) => {
                if (response.status === 200)
                    response.json().then((data) => {
                        this.photos = data;
                        this.emit('change');
                    });
            });
    }

    getAll() {
        return this.photos;
    }

    handleAction() {
    }
}

const photoStore = new PhotoStore();
dispatcher.register(photoStore.handleAction.bind(photoStore));

export default photoStore;
