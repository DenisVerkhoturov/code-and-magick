'use strict';

import React from 'react';
import store from '../stores/GalleryStore';

export default class Gallery extends React.Component
{
    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            photos: store.getAll()
        };
    }

    componentWillMount() {
        store.on('change', () => this.setState({
            photos: store.getAll()
        }));
    }

    render() {
        const photos = this.state.photos.map((photo, index) => {
            return (
                <a key={ index } href="#" className="photogallery-image">
                    <img src={ photo.file }
                         width="290"
                         height="270" />
                </a>
            );
        });

        return (
            <section className="main-section photogallery">
                <h2 className="section-title photogallery-title">Фотогалерея</h2>
                { photos }
            </section>
        );
    }
}
