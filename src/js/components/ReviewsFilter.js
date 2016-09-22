'use strict';

import React from 'react';

export default class ReviewsFilter extends React.Component
{
    /**
     * @param props
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="reviews-filter" action="index.html" method="get">
                <input type="radio" name="reviews" id="reviews-all" value="reviews-all" checked/>
                <label htmlFor="reviews-all" className="reviews-filter-item">Все</label>
                <input type="radio" name="reviews" id="reviews-recent" value="reviews-recent"/>
                <label htmlFor="reviews-recent" className="reviews-filter-item">Недавние</label>
                <input type="radio" name="reviews" id="reviews-good" value="reviews-good"/>
                <label htmlFor="reviews-good" className="reviews-filter-item">Хорошие</label>
                <input type="radio" name="reviews" id="reviews-bad" value="reviews-bad"/>
                <label htmlFor="reviews-bad" className="reviews-filter-item">Плохие</label>
                <input type="radio" name="reviews" id="reviews-popular" value="reviews-popular"/>
                <label htmlFor="reviews-popular" className="reviews-filter-item"> Популярные</label>
            </form>
        );
    }
}
