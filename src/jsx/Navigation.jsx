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
               <Next/>
               <Previous />
           </nav>
        )

    }

}

module.exports = Navigation;