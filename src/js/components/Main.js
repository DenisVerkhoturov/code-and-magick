'use strict';

import React from 'react';
import Gallery from './Gallery';
import Reviews from './Reviews';
import Game from './Game';

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
                <Game />
                <Gallery />
                <Reviews />
            </div>
        );
    }
}
