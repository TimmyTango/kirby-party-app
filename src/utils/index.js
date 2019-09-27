import React from 'react';

export const SocketContext = React.createContext(null);

function truncate(str, maxLen) {
    if (str.length > maxLen) {
        return str.substring(0, maxLen - 3) + '...';
    }
    return str;
}

export function displayTrack({ title, artist }) {
    if (!title) {
        title = 'Unknown Track';
    }

    if (!artist) {
        artist = 'Unknown Artist';
    }

    return (
        <span>
            {truncate(title, 30)}
            <br />
            {truncate(artist, 30)}
        </span>
    );
}

export function displayTime(seconds) {
    if (seconds < 60) {
        return `${seconds} seconds`;
    } else {
        const minutes = Math.floor(seconds / 60);
        const remainder = seconds % 60;
        return `${minutes} minutes and ${remainder} seconds`;
    }
}
