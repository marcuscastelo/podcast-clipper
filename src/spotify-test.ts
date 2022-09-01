import chalk from 'chalk';
import { isErr } from './common/result';
import { SpotifyTrack } from './generic-playlist';
import { getFullPlaylist, getPlaylistId } from './spotify/playlist-utils';

import { spotifyApi } from './spotify/spotify-api';

export async function testSpotify() {
    if (!spotifyApi.getAccessToken()) {
        return console.error(chalk.red('Spotify api not authenticated'));
    }

    //TODO: get playlist from user
    const playlistUrl = 'https://open.spotify.com/playlist/3LrJRcZym9u8ogcdBZwP15?si=6fc0812e2b19466a';

    const playlistIdResult = getPlaylistId(playlistUrl);
    if (isErr(playlistIdResult)) {
        return console.error(chalk.red(`Error getting playlist ID: ${playlistIdResult.error}`));
    }

    const { value: playlistId } = playlistIdResult;
    const { tracks, playlist } = await getFullPlaylist(playlistId);
    console.log(chalk.green(`Playlist ID: ${playlistId}`));


    console.log(chalk.green(`Found ${tracks.length} tracks`));
    //Print as json with indentation
    // console.log(JSON.stringify(playlist, null, 2));

    const listTrackArtists = (track: SpotifyTrack) => track.artists.map(artist => artist.name).join(', ');

    const queries = playlist.tracks.map(track => `${listTrackArtists(track)} - ${track.name}`)
    for (const query of queries) {
        console.log(chalk.green(`Searching for ${query}`));
    }

}
