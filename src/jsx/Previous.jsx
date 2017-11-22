import React from 'react';


class Previous extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
                <div className="control-container previous">
                    <span className="slide-control" id="Control-previous"></span>
                </div>

        )

    }

}

module.exports = Previous;