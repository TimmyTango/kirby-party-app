import React from 'react';
import { SocketContext } from '../utils';
import { displayTrack } from '../utils';

class TrackChoice extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.socket = this.context;
        this.clicked = this.clicked.bind(this);
    }

    clicked() {
        console.log(this.props.track);
        this.socket.emit('vote', this.props.index);
    }

    render() {
        return (
            <button className="vote" onClick={this.clicked}>
                {displayTrack(this.props.track)}
            </button>
        );
    }
}

TrackChoice.contextType = SocketContext;
export default TrackChoice;
