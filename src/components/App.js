import React from 'react';
import io from 'socket.io-client';

import { SocketContext } from '../utils';
import TrackChoices from './TrackChoices';
import NowPlaying from './NowPlaying';

export class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <SocketContext.Provider value={io('https://tango.tplinkdns.com:8080/')}>
                    <NowPlaying />
                    <TrackChoices />
                </SocketContext.Provider>
            </div>
        );
    }
}
