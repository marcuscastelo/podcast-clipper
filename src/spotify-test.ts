import assert from 'assert';
import chalk from 'chalk';
import { isErr } from './common/result';
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
    console.log(JSON.stringify(playlist, null, 2));
}
