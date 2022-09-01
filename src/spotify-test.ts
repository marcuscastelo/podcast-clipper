import chalk from 'chalk';
import { isErr } from './common/result';
import { SpotifyTrack } from './generic-playlist';
import { convertPlaylistToQueries, getFullPlaylist, getPlaylistId } from './spotify/playlist-utils';

import { spotifyApi } from './spotify/spotify-api';

export async function listPlaylistTracksAsQueries(playlistUrl: string) {
    if (!spotifyApi.getAccessToken()) {
        return console.error(chalk.red('Spotify api not authenticated'));
    }

    const playlistIdResult = getPlaylistId(playlistUrl);
    if (isErr(playlistIdResult)) {
        return console.error(chalk.red(`Error getting playlist ID: ${playlistIdResult.error}`));
    }

    const { value: playlistId } = playlistIdResult;
    const { tracks, playlist } = await getFullPlaylist(playlistId);
    console.log(chalk.green(`Playlist ID: ${playlistId}`));

    console.log(chalk.green(`Found ${tracks.length} tracks`));
    const queries = convertPlaylistToQueries(playlist);
    return queries;

}
