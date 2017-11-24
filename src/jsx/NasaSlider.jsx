import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation.jsx';

class NasaSlider extends React.Component {

    constructor(props) {
        super(props);

        this.img = new Image();
        this.addressImg ='';

        this.state = {
            apod : null,
            imgLoaded: false,
        }
    }

    componentWillMount() {
        this.getApod('https://api.nasa.gov/planetary/apod?api_key=l1mzjg89PDylwrIsHFXtcCHM0EoBcnjdKWNQ151A');
        this.img.onload = () => {
            this.setState({imgLoaded: true}, () => console.log('zaladowalo'));
        };

    }

    render() {

        if (!this.state.apod) {
            //bedzie preloading
            return <h1>Nie otrzymano obiektu z API</h1>
        }else if(!this.state.imgLoaded) {
            //bedzie preloading
            this.addressImg = this.state.apod.hdurl;
            this.img.src = this.addressImg;
            return <h1>Obrazek sie laduje</h1>
        } else {
            let styles = {backgroundImage : "url(" + this.img.src + ")",
            };
            //this.setState({imgLoaded: false}, () => console.log('state na false'));
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


