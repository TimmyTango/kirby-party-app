import React, { useCallback, useEffect, useState, useContext } from 'react';

import { SocketContext, getToken } from '../utils';
import TrackChoice from './TrackChoice';
import Track from './Track';

export default function TrackChoices() {
    const [choices, setChoices] = useState([]);
    const [canVote, setCanVote] = useState(false);
    const [votes, setVotes] = useState([]);
    const socket = useContext(SocketContext);

    const requestChoices = useCallback(() => {
        socket.emit('request-choices', getToken());
    }, [socket]);

    const onUpdateChoices = useCallback(({ canVote, tracks, votes }) => {
        setChoices(tracks);
        setCanVote(canVote);
        setVotes(votes);
    }, []);

    const onVoteCast = useCallback((votes) => {
        setCanVote(false);
        setVotes(votes);
    }, []);

    useEffect(() => {
        socket.on('update-choices', onUpdateChoices);
        socket.on('vote-cast', onVoteCast);

        return () => {
            socket.off('update-choices', onUpdateChoices);
            socket.off('vote-cast', onVoteCast);
        }
    }, []);

    useEffect(() => {
        requestChoices();
        window.addEventListener('focus', requestChoices);

        return () => {
            window.removeEventListener('focus', requestChoices);
        }
    }, [socket]);

    if (!choices || choices.length === 0) return null;

    let totalVotes = 0;
    if (votes && votes.length > 0) {
        totalVotes = votes.reduce((sum, value) => sum + value);
    }

    if (canVote) {
        return choices.map((choice, index) => <TrackChoice key={index} index={index} track={choice} />);
    } else {
        return choices.map((choice, index) => {
            const percent = Math.floor((votes[index] / totalVotes) * 100);
            return <Track key={index} percent={percent} track={choice} />
        });
    }
}
