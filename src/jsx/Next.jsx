import React from 'react';


class Next extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div className="control-container next" onClick={this.loadNextApod}>
                <span className="slide-control" id="Control-next"></span>
            </div>

        )
    }

    loadNextApod = e => {
        this.props.getNextApodFn(-1);
    }
}

module.exports = Next;