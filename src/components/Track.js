import React from 'react';
import { SocketContext } from '../utils';
import { displayTrack } from '../utils';

export default function Choice({track, percent}) {
    return (
        <div className="track">
            {displayTrack(track)}
            <div className="percent-wrapper">
                <span className="percent-label">{percent}%</span>
            </div>
        </div>
    );
}
