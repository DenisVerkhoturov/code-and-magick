'use strict';

import React from 'react';
import store from '../stores/ReviewStore';

export default class ReviewsFilter extends React.Component
{
    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            current: store.getCurrentFilter(),
            filters: store.getFilters()
        };
    }

    componentWillMount() {
        store.on('change', () => this.setState({
            current: store.getCurrentFilter()
        }));
    }

    render() {
        const filters = [];
        this.state.filters.forEach((filter, index) => {
            filters.push(
                <div key={ index } className="reviews-filter-item">
                    <input type="radio"
                           name="reviews"
                           id={ index }
                           value={ index }
                           checked={ this.state.current === filter }
                           onChange={ store.changeFilter.bind(store) } />
                    <label htmlFor={ index }>
                        { filter.name }
                    </label>
                </div>
            );
        });
        return (
            <form className="reviews-filter" action="index.html" method="get">
                { filters }
            </form>
        );
    }
}
