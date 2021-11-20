import React from 'react';
import io from 'socket.io-client';

import { SocketContext } from '../utils';
import TrackChoices from './TrackChoices';
import NowPlaying from './NowPlaying';

export class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <SocketContext.Provider value={io('http://localhost:3005/')}>
                    <NowPlaying />
                    <TrackChoices />
                </SocketContext.Provider>
            </div>
        );
    }
}
