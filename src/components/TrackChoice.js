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
        const token = localStorage.getItem('token');
        if (token === null) {
            this.socket.emit('generate-token');
            this.socket.on('token-generated', token => {
                localStorage.setItem('token', tok);
                this.socket.emit('vote', { index: this.props.index, tok });
            });
        } else {
            this.socket.emit('vote', { index: this.props.index, token });
        }
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
