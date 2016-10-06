import React from 'react';
import ReactDOM from 'react-dom';

import Balloon from './game/Balloon';
import { VERDICT } from './game/constants';

export default class Game extends React.Component
{
    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            context: null,
            keys: {
                LEFT: false,
                UP: false,
                RIGHT: false,
                ESC: false,
                SHIFT: false
            },
            verdict: VERDICT.CONTINUE,
            objects: []
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.state.context = ReactDOM.findDOMNode(this).getContext('2d');
        this.state.context.font = '16px PT Mono';
        this.state.context.textBaseline = 'middle';

        this.state.objects.push(new Balloon(
            'Welcome to the game! Press Space to start',
            this.state.context
        ));

        window.addEventListener('keydown', this.handleKeys.bind(this, true));
        window.addEventListener('keyup', this.handleKeys.bind(this, false));

        requestAnimationFrame(() => this.update());
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeys);
        window.removeEventListener('keyup', this.handleKeys);
    }

    update() {
        this.state.context.clearRect(0, 0, this.state.context.canvas.clientWidth, this.state.context.canvas.clientHeight);

        this.state.objects.forEach((obj) => obj.draw());

        requestAnimationFrame(() => this.update());
    }

    /**
     * @private
     * @param {boolean} value
     * @param {KeyboardEvent} event
     */
    handleKeys(value, event) {
        if (event.keyCode === 37) this.state.keys.LEFT = value;
        if (event.keyCode === 38) this.state.keys.UP = value;
        if (event.keyCode === 39) this.state.keys.RIGHT = value;
        if (event.keyCode === 27) this.state.keys.ESC = value;

        this.state.keys.SHIFT = event.shiftKey;
    }

    render() {
        return (
            <canvas width={ this.props.width }
                    height={ this.props.height } />
        );
    }
}

Game.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number
};

Game.defaultProps = {
    width: 700,
    height: 300
};
