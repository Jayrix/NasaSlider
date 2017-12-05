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
            fetchInProgress: false,
        }

        this.today = new Date();
        this.prevDateTime = this.today.getTime();

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

        if (!this.state.apod || this.state.fetchInProgress === true || !this.state.imgLoaded) {
            console.log('pierwszy if');
            //return <h1>Nie otrzymano obiektu z API</h1>
            return (
                <Preloader/>
            )
        }else if(this.state.apod.media_type !== "image") {
            console.log('drugi if');
            return <h1>not an image</h1>
        } else {
            console.log('trzeci if - slide');
            let styles = {backgroundImage : "url(" + this.img.src + ")",
            };
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

            )
        }
    }

    componentDidMount(){
        console.log('did mount');
    }

     // shouldComponentUpdate(nextProps, nextState){
     //    console.log(this.state.imgLoaded === false);
     //     return (this.state.imgLoaded === false)
     // }



    getApod = (url) =>{

        this.setState({fetchInProgress: true});
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
                    if(this.prevDateTime < this.state.date.getTime() ){
                        console.log('not an image, proceeding to prev apod');
                        this.getNextApod(1);
                    } else {
                        console.log('not an image, proceeding to next apod');
                        this.getNextApod(-1);
                    }
                } else {
                    this.setState({apod : result, imgLoaded: false, fetchInProgress: false}, ()=> {
                        console.log(this.state.apod);
                        this.addressImg = this.state.apod.url;
                        this.img.src = this.addressImg;
                    } )
                }
            })

            .catch(e=> console.log("exception: " + e))

        console.log(this.state.imgLoaded);

    }

     getNextApod = (iterator) =>{
        console.log("next " + this.state.imgLoaded);

        let newDate = new Date(this.state.date.getTime());
        newDate.setDate(newDate.getDate() + iterator);


        if(newDate.getTime() <= this.today.getTime()){
            let dateString = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
            console.log(dateString);
            console.log('data to ' + newDate, this.today);
            // console.log(this.state.date);
            this.prevDateTime = this.state.date.getTime();
            this.setState({
                date: newDate,
            }, this.getApod('https://api.nasa.gov/planetary/apod?api_key=l1mzjg89PDylwrIsHFXtcCHM0EoBcnjdKWNQ151A&date=' + dateString));
        }

    }

}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <NasaSlider />,
        document.getElementById('slider')
    );
});


