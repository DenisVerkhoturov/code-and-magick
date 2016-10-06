import React from 'react';
import Game from './Game';

export default class Header extends React.Component
{
    /**
     * @param props
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Game />
        );
    }
}
