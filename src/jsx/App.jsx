import React from 'react';
import ReactDOM from 'react-dom';
import NasaImages from './NasaImages.jsx';
import Navigation from './Navigation.jsx';

class Slider extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
            <article>
                <NasaImages />
                <Navigation />
            </article>
        )

    }

}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <Slider />,
        document.getElementById('slider')
    );
});


