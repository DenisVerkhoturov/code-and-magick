import React from 'react';
import Gallery from './Gallery';
import Reviews from './Reviews';

export default class Main extends React.Component
{
    /**
     * @param props
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Gallery />
                <Reviews />
            </div>
        );
    }
}
