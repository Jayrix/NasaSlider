import React from 'react';
import Next from './Next.jsx';
import Previous from './Previous.jsx';


class Navigation extends React.Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     date : new Date(),
        // }

    }


    render() {

        return (
           <nav>
               <Previous getNextApodFn={this.props.getApodFn} />
               <Next  getNextApodFn={this.props.getApodFn} />
           </nav>
        )

    }

    // static getNextApod = (iterator) =>{
    //     let newDate = new Date(this.state.date.getTime());
    //     newDate.setDate(newDate.getDate() + iterator);
    //     let dateString = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    //     console.log(dateString);
    //     // console.log(newDate);
    //     // console.log(this.state.date);
    //     this.setState({
    //         date: newDate,
    //     }, this.props.getApodFn('https://api.nasa.gov/planetary/apod?api_key=l1mzjg89PDylwrIsHFXtcCHM0EoBcnjdKWNQ151A&date=' + dateString));
    // }

    // getPreviousApod = () =>{
    //     let newDate = new Date(this.state.date.getTime());
    //     newDate.setDate(newDate.getDate()+1);
    //     let dateString = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    //     // console.log(newDate);
    //     // console.log(this.state.date);
    //     this.setState({
    //         date: newDate,
    //     }, this.props.getApodFn('https://api.nasa.gov/planetary/apod?api_key=l1mzjg89PDylwrIsHFXtcCHM0EoBcnjdKWNQ151A&date=' + dateString));
    // }



}

module.exports = Navigation;