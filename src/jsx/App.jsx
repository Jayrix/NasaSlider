import React from 'react';
import ReactDOM from 'react-dom';
import NasaImages from './NasaImages.jsx';
import Navigation from './Navigation.jsx';

class Slider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            apod : null,
        }

    }


    render() {



        if (!this.state.apod) {
            return <h1>Nie otrzymano obiektu z API</h1>
        } else {
            let addressImg = this.state.apod.hdurl;
            let styles = {background : "url(" + addressImg + ") no-repeat center",
                            backgroundSize: "100% 100%"
            };
            return (
                <article>
                    {/*<div className="image-container"><img src={adressImg} alt=""/></div>*/}
                    <div className="imageDiv" style={styles}></div>
                    <NasaImages />
                    <Navigation />
                </article>
            )
        }

    }

    componentDidMount() {

        fetch('https://api.nasa.gov/planetary/apod?api_key=l1mzjg89PDylwrIsHFXtcCHM0EoBcnjdKWNQ151A')
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
        <Slider />,
        document.getElementById('slider')
    );
});


