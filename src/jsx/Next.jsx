import React from 'react';


class Next extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
            <div className="control-container next">
                <span className="slide-control" id="Control-next"></span>
            </div>

        )

    }

}

module.exports = Next;