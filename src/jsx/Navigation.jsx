import React from 'react';
import Next from './Next.jsx';
import Previous from './Previous.jsx';


class Navigation extends React.Component {

    constructor(props) {
        super(props);


    }


    render() {

        return (
           <nav>
               <Previous getNextApodFn={this.props.getApodFn} />
               <Next  getNextApodFn={this.props.getApodFn} />
           </nav>
        )

    }



}

module.exports = Navigation;