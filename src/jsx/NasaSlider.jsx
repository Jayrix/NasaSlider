import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation.jsx';
import Preloader from './Preloader.jsx';

class NasaSlider extends React.Component {

    constructor(props) {
        super(props);

        this.img = new Image();
        this.addressImg ='';

        this.state = {
            apod : null,
            imgLoaded: false,
            date : new Date(),
        }

        console.log('konstruktor');
    }

    componentWillMount() {
        console.log('willmount');
        this.getApod('https://api.nasa.gov/planetary/apod?api_key=l1mzjg89PDylwrIsHFXtcCHM0EoBcnjdKWNQ151A');
        this.img.onload = () => {
            this.setState({imgLoaded: true}, () => console.log('zaladowalo'));
        };

    }

    render() {

        if (!this.state.apod) {
            //bedzie preloading
            console.log('pierwszy if');
            return <h1>Nie otrzymano obiektu z API</h1>
        }else if(this.state.apod.media_type !== "image") {
            console.log('drugi if');
            //this.getNextApod(-1);
            return <h1>not an image</h1>
        }else if(!this.state.imgLoaded) {
            //bedzie preloading
            // this.addressImg = this.state.apod.url;
            // this.img.src = this.addressImg;
            console.log('trzeci if');
            return (
                <Preloader/>
            )
        } else {
            console.log('czwarty if');

            let styles = {backgroundImage : "url(" + this.img.src + ")",
            };
            //this.setState({imgLoaded: false}, () => console.log('state na false'));
            return (
                <ul id="SliderList">
                    <li className="image-container" style={styles}></li>
                    <li className="navigation-container">
                        <Navigation getApodFn={this.getNextApod} />
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

    componentDidMount(){
        console.log('did mount');
        // if(this.state.apod.media_type !== "image"){
        //     this.getNextApod(-1);
        // }
        //console.log(this.state.apod.media_type);
    }

     // shouldComponentUpdate(nextProps, nextState){
     //    console.log(this.state.imgLoaded === false);
     //     return (this.state.imgLoaded === false)
     // }



    getApod = (url) =>{

        // this.setState({imgLoaded : false}, ()=> {
        //
        // });
        console.log(this.state.imgLoaded);

        fetch(url, {method : 'GET'})
            .then(result => {
                if (result.ok){
                    return result.json();
                }else{
                    throw new Exception('nie otrzymano obiektu');
                }
            })
            .then(result => {
                if (result.media_type !== "image"){
                    //get earlier Apod
                    this.getNextApod(-1);
                } else {
                    this.setState({apod : result, imgLoaded: false}, ()=> {
                        console.log(this.state.apod);
                        this.addressImg = this.state.apod.hdurl;
                        this.img.src = this.addressImg;
                    } )
                }
            })
            // .then(result => this.setState({apod : result}, ()=> {
            //     console.log(this.state.apod);
            //     this.addressImg = this.state.apod.hdurl;
            //     this.img.src = this.addressImg;
            // } ))
            .catch(e=> console.log("exception: " + e))

        console.log(this.state.imgLoaded);

    }

     getNextApod = (iterator) =>{
         console.log("next " + this.state.imgLoaded);

        let newDate = new Date(this.state.date.getTime());
        newDate.setDate(newDate.getDate() + iterator);
        let dateString = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
        console.log(dateString);
        // console.log(newDate);
        // console.log(this.state.date);
        this.setState({
            date: newDate,
        }, this.getApod('https://api.nasa.gov/planetary/apod?api_key=l1mzjg89PDylwrIsHFXtcCHM0EoBcnjdKWNQ151A&date=' + dateString));
    }

}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <NasaSlider />,
        document.getElementById('slider')
    );
});


