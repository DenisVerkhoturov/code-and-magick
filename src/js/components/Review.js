'use strict';

import React from 'react';

export default class Review extends React.Component
{
    /**
     * @param {Object} props
     * @param {String} props.avatar
     * @param {String} props.author
     * @param {Number} props.rating
     * @param {String} props.description
     * @param {Number} props.review_usefulness
     */
    constructor(props) {
        super(props);
    }

    render() {
        const raitingClass = 'review-rating rating-' + this.props.rating + '-stars';
        return (
            <article className="review">
                <img src={ this.props.avatar } className="review-author" alt="" title={ this.props.author }/>
                <span className={ raitingClass }>{ this.props.rating }</span>
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
    author: React.PropTypes.string.isRequired,
    avatar: React.PropTypes.string.isRequired,
    rating: React.PropTypes.number.isRequired,
    description: React.PropTypes.string.isRequired,
    review_usefulness: React.PropTypes.number
};
