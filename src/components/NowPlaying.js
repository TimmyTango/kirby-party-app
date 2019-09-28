import React from 'react';

import { SocketContext } from '../utils';
import { displayTrack, displayTime } from '../utils';

class NowPlaying extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            timeLeft: 0
        };

        this.socket = this.context;
    }

    componentDidMount() {
        this.socket.emit('request-state');

        this.socket.on('update-state', ({ currentTrack, elapsedTime }) => {
            const timeLeft = currentTrack.duration - elapsedTime;
            this.setState({ currentTrack, timeLeft });
        });
    }

    renderCurrentTrack() {
        if (!this.state.currentTrack) {
            return '...';
        }

        return displayTrack(this.state.currentTrack);
    }

    render() {
        return (
            <div>
                <p>
                    <span className="strong">Current Track:</span>
                    <br />
                    {this.renderCurrentTrack()}
                </p>
                <p>
                    <span className="strong">Time left:</span>
                    <br />
                    {displayTime(this.state.timeLeft)}
                </p>
            </div>
        );
    }
}

NowPlaying.contextType = SocketContext;
export default NowPlaying;
