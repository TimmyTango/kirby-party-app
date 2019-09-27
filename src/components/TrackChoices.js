import React from 'react';

import { SocketContext } from '../utils';
import TrackChoice from './TrackChoice';
import { displayTrack } from '../utils';

class TrackChoices extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.socket = this.context;
    }

    componentDidMount() {
        this.socket.emit('request-choices');
        this.socket.on('update-choices', ({ canVote, tracks }) => {
            this.setState({ choices: tracks, canVote });
        });
        this.socket.on('vote-cast', () => {
            this.setState({ canVote: false });
        });
    }

    renderTracks() {
        console.log('choices', this.state.choices);
        if (!this.state.choices) {
            return null;
        }
        const { choices } = this.state;
        return choices.map((choice, index) => {
            if (this.state.canVote) {
                return <TrackChoice key={index} index={index} track={choice} />;
            } else {
                return <div key={index}>{displayTrack(choice)}</div>;
            }
        });
    }

    render() {
        return <div>{this.renderTracks()}</div>;
    }
}

TrackChoices.contextType = SocketContext;
export default TrackChoices;
