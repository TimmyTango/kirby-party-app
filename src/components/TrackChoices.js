import React from 'react';

import { SocketContext } from '../utils';
import TrackChoice from './TrackChoice';
import Track from './Track';
import { displayTrack } from '../utils';

class TrackChoices extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.socket = this.context;
    }

    componentDidMount() {
        this.socket.emit('request-choices', localStorage.getItem('token'));
        window.addEventListener('focus', event => {
            if(localStorage.getItem('token')) {
                this.socket.emit('request-choices', localStorage.getItem('token'));
            }
        });
        this.socket.on('update-choices', ({ canVote, tracks, votes }) => {
            this.setState({ choices: tracks, canVote, votes });
        });
        this.socket.on('vote-cast', votes => {
            this.setState({ canVote: false, votes });
        });
    }

    renderTracks() {
        if (!this.state.choices) {
            return null;
        }
        const { choices } = this.state;

        let totalVotes = 0;
        if (this.state.votes) {
            console.log(this.state.votes);
            this.state.votes.map(votes => {
                totalVotes += votes;
            });
            console.log(totalVotes);
        }
        return choices.map((choice, index) => {
            if (this.state.canVote) {
                return <TrackChoice key={index} index={index} track={choice} />;
            } else {
                const percent = Math.floor((this.state.votes[index] / totalVotes) * 100);
                console.log(percent);
                return <Track key={index} percent={percent} track={choice} />;
            }
        });
    }

    render() {
        return <div>{this.renderTracks()}</div>;
    }
}

TrackChoices.contextType = SocketContext;
export default TrackChoices;
