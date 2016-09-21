'use strict';

import React, { Component, PropTypes } from 'react';

export class Review extends Component
{
    /**
     * @param props
     * @param {string} props.avatar
     * @param {string} props.author
     * @param {number} props.rating
     * @param {string} props.description
     * @param {number} props.review_usefulness
     */
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <article className="review">
                <img src={ this.props.avatar } className="review-author" alt="" title={ this.props.author }/>
                <span className="review-rating">{ this.props.rating } звезд</span>
                <p className="review-text">{ this.props.description }</p>
                <div className="review-quiz">
                    Полезный отзыв ?
                    <span className="review-quiz-answer review-quiz-answer-yes">Да</span>
                    <span className="review-quiz-answer review-quiz-answer-no">Нет</span>
                </div>
            </article>
        );
    }
}

Review.propTypes = {
    author: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    review_usefulness: PropTypes.number
};
