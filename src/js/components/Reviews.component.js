'use strict';

import React, { Component, PropTypes } from 'react';
import { Review } from './Review.component';
import store from '../stores/ReviewStore';

export default class Reviews extends Component
{
    /**
     * @param props
     * @param {Array.<Review>} props.reviews
     */
    constructor(props)
    {
        super(props);
        this.state = {
            reviews: store.getAll()
        };
    }

    componentWillMount()
    {
        store.on('change', () => this.setState({
            reviews: store.getAll()
        }));
    }

    render()
    {
        const reviews = this.state.reviews.map((review, index) => {
            return (
                <Review key={ index }
                        author={ review.author.name }
                        avatar={ review.author.picture }
                        rating={ review.rating }
                        description={ review.description }/>
            );
        });

        return (
            <div className="reviews-list">
                { reviews }
            </div>
        );
    }
}

Reviews.propTypes = {
    reviews: PropTypes.array
};
