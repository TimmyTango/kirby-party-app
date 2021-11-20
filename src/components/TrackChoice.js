import React, { useCallback, useContext } from 'react';
import { SocketContext } from '../utils';
import { displayTrack } from '../utils';

export default function TrackChoice({track, index}) {
    const socket = useContext(SocketContext);

    const onTokenGenerated = useCallback((newToken) => {
        localStorage.setItem('token', newToken);
        socket.emit('vote', { index, token: newToken });
    }, [socket, index]);

    const onVote = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token === null) {
            socket.emit('generate-token');
            socket.on('token-generated', onTokenGenerated);
        } else {
            socket.emit('vote', { index, token });
        }
    }, [socket, track, index]);

    return (
        <button className="vote" onClick={onVote}>
            { displayTrack(track) }
        </button>
    );
}
