'use strict';

import React from 'react';

export default class Gallery extends React.Component
{
    /**
     * @param props
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="main-section photogallery">
                <h2 className="section-title photogallery-title">Фотогалерея</h2>
                <a href="#" className="photogallery-image"><img src="img/screenshots/1.png" width="292"/></a>
                <a href="#" className="photogallery-image"><img src="img/screenshots/2.png" width="292"/></a>
                <a href="#" className="photogallery-image"><img src="img/screenshots/3.png" width="292"/></a>
                <a href="#" className="photogallery-image"><img src="img/screenshots/4.png" height="271"/></a>
                <a href="#" className="photogallery-image"><img src="img/screenshots/5.png" height="271"/></a>
                <a href="#" className="photogallery-image" data-replacement-video="img/screenshots/cm-sample.mp4"><img src="img/screenshots/6.png" width="292"/></a>
            </section>
        );
    }
}
