import React from 'react';
import { SocketContext } from '../utils';
import { displayTrack } from '../utils';

class Choice extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="track">
                {displayTrack(this.props.track)}
                <div className="percent-wrapper">
                    <span className="percent-label">{this.props.percent}%</span>
                </div>
            </div>
        );
    }
}

Choice.contextType = SocketContext;
export default Choice;
