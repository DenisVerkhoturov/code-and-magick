'use strict';

import React from 'react';
import ReviewsFilter from './ReviewsFilter';
import Review from './Review';
import store from '../stores/ReviewStore';

export default class Reviews extends React.Component
{
    /**
     * @param props
     * @param {Array} props.reviews
     */
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        };
    }

    componentWillMount() {
        store.on('change', () => this.setState({
            reviews: store.getAll()
        }));
    }

    render() {
        const reviews = this.state.reviews.map((review, index) => {
            return (
                <Review key={ index }
                        author={ review.author.name }
                        avatar={ review.author.picture }
                        rating={ review.rating }
                        description={ review.description } />
            );
        });

        return (
            <section className="main-section reviews">
                <h2 className="section-title reviews-title">Отзывы</h2>
                <ReviewsFilter />
                { reviews }
                <div className="reviews-controls">
                    <span className="reviews-controls-item reviews-controls-more invisible">Ещё отзывы</span>
                    <span className="reviews-controls-item reviews-controls-new">+ Добавить свой</span>
                </div>
            </section>
        );
    }
}

Reviews.propTypes = {
    reviews: React.PropTypes.array
};
