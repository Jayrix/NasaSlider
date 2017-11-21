import React from 'react';
import NasaSlide from './NasaSlide.jsx';

class NasaImages extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        let slides = '';

        return (
            <ul>
                {slides}
            </ul>
        )

    }

}

module.exports = NasaImages;