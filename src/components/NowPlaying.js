import React, { useState, useContext, useEffect, useCallback } from 'react';

import { SocketContext, displayTrack, displayTime } from '../utils';

export default function NowPlaying() {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const socket = useContext(SocketContext);

    const updateState = useCallback(({ currentTrack, elapsedTime }) => {
        setTimeLeft(currentTrack.duration - elapsedTime);
        setCurrentTrack(currentTrack); 
    }, []);

    useEffect(() => {
        socket.emit('request-state');
        socket.on('update-state', updateState);

        return () => {
            socket.off('update-state', updateState);
        }
    }, []);

    return (
        <div>
            <div style={{marginBottom: 10}}>
                <div className="strong underline" style={{marginBottom: 5}}>Current Track</div>
                { currentTrack ? displayTrack(currentTrack) : '...' }
            </div>
            <div style={{marginBottom: 10}}>
                <div className="strong underline" style={{marginBottom: 5}}>Time Left</div>
                { displayTime(timeLeft) }
            </div>
        </div>
    )
}
