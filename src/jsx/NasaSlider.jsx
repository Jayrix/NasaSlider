import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation.jsx';

class NasaSlider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            apod : null,
        }
    }

    componentWillMount() {
        this.getApod('https://api.nasa.gov/planetary/apod?api_key=l1mzjg89PDylwrIsHFXtcCHM0EoBcnjdKWNQ151A');


    }

    render() {

        if (!this.state.apod) {
            return <h1>Nie otrzymano obiektu z API</h1>
        } else {
            let addressImg = this.state.apod.hdurl;
            let styles = {backgroundImage : "url(" + addressImg + ")",
            };
            return (
                <ul id="SliderList">
                    <li className="image-container" style={styles}></li>
                    <li className="navigation-container">
                        <Navigation getApodFn={this.getApod} />
                    </li>
                    <li className="dots-container">
                        <ul></ul>
                    </li>
                </ul>
                // <article>
                //     {/*<div className="image-container"><img src={adressImg} alt=""/></div>*/}
                //     <div className="imageDiv" style={styles}>
                //         <Navigation />
                //     </div>
                // </article>
            )
        }
    }

    getApod = (url) =>{
        fetch(url, {method : 'GET'})
            .then(result => {
                if (result.ok){
                    return result.json();
                }else{
                    throw new Exception('nie otrzymano obiektu');
                }
            })
            .then(result => this.setState({apod : result}, ()=> console.log(this.state.apod) ))
            .catch(e=> console.log(e))
    }

}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <NasaSlider />,
        document.getElementById('slider')
    );
});


