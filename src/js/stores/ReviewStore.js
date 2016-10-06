import dispatcher from '../dispatchers/dispatcher';
import { EventEmitter } from 'events';
import { ACTIONS } from '../actions/reviewActions';

class ReviewStore extends EventEmitter
{
    constructor() {
        super();
        this.reviews = [];
        this.filters = new Map();
        this.filters.set('all', {
            name: 'Все',
            process: (reviews) => reviews
        });
        this.filters.set('recent', {
            name: 'Недавние',
            process: (reviews) => reviews
                .filter((review) => review.date > Date.now())
                .sort((a, b) => b.date - a.date)
        });
        this.filters.set('good', {
            name: 'Хорошие',
            process: (reviews) => reviews
                .filter((review) => review.rating > 2)
                .sort((a, b) => b.rating - a.rating)
        });
        this.filters.set('bad', {
            name: 'Плохие',
            process: (reviews) => reviews
                .filter((review) => review.rating < 3)
                .sort((a, b) => a.rating - b.rating)
        });
        this.filters.set('popular', {
            name: 'Популярные',
            process: (reviews) => reviews
                .sort((a, b) => b.review_usefulness - a.review_usefulness)
        });

        this.currentFilter = this.filters.get('all');

        fetch('data/reviews.json')
            .then((response) => {
                if (response.status === 200)
                    response.json().then((data) => data.forEach((review) => this.add(review)));
            });
    }

    getFilters() {
        return this.filters;
    }

    getCurrentFilter() {
        return this.currentFilter;
    }

    changeFilter(event) {
        this.currentFilter = this.filters.get(event.target.value);
        this.emit('change');
    }

    getAll() {
        return this.currentFilter.process(this.reviews);
    }

    /**
     * @param {Object} review
     * @param {Object} review.author
     * @param {string} review.author.name
     * @param {string} review.author.picture
     * @param {string} review.date Date in YYYY-MM-DD format
     * @param {number} review.review_usefulness
     * @param {number} review.rating
     * @param {string} review.description
     */
    add(review) {
        this.reviews.push(review);
        this.emit('change');
    }

    remove(index) {
        this.reviews.splice(index, 1);
        this.emit('change');
    }

    handleAction(action) {
        switch (action.type) {
        case ACTIONS.ADD:
            this.add(action.data);
            break;
        case ACTIONS.REMOVE:
            this.remove(action.data);
            break;
        }
    }
}

const reviewStore = new ReviewStore();
dispatcher.register(reviewStore.handleAction.bind(reviewStore));

export default reviewStore;
