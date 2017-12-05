import React from 'react';


class Previous extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
                <div className="control-container previous" onClick={this.loadPreviousApod}>
                    <span className="slide-control" id="Control-previous"></span>
                </div>

        )

    }

    loadPreviousApod = e =>{
        this.props.getNextApodFn(1,this.props.apod);
    }

}

module.exports = Previous;