import assert from 'assert';
import chalk from 'chalk';
import SpotifyWebApi from 'spotify-web-api-node';
import credentials from './credentials.json';

export async function testSpotify() {
    // console.log(credentials);
    const spotifyApi = new SpotifyWebApi({
        clientId: credentials.spotify.clientId,
        clientSecret: credentials.spotify.clientSecret,
        redirectUri: 'http://www.example.com/callback',
    });

    const token = await spotifyApi.clientCredentialsGrant().then(data => data.body['access_token']);
    spotifyApi.setAccessToken(token);

    const playlistUrl = 'https://open.spotify.com/playlist/3LrJRcZym9u8ogcdBZwP15?si=6fc0812e2b19466a';

    const playlistId = playlistUrl.split('/').pop()?.split('?')[0];
    console.log(chalk.green(`Playlist ID: ${playlistId}`));

    if (!playlistId) {
        throw new Error('Invalid playlist URL');
    }

    spotifyApi.getPlaylist(playlistId);

    const playlist = await spotifyApi.getPlaylist(playlistId);
    console.log(chalk.green(`Playlist ${playlist.body.name} has ${playlist.body.tracks.total} tracks`));

    // console.log(playlist);

    let currentTrackPage = playlist.body.tracks.href;
    let currentTrackPageNumber = 1;
    let totalTracks = playlist.body.tracks.total;
    let limit = playlist.body.tracks.limit;

    let tracks: any[] = [];

    const numberOfPages = Math.ceil(totalTracks / limit) || 1;
    while (currentTrackPageNumber <= numberOfPages) {
        const currentTracksPage = await spotifyApi.getPlaylistTracks(playlistId, {
            limit: limit,
            offset: (currentTrackPageNumber - 1) * limit,
        });

        const firstTrack = currentTracksPage.body.items[0];

        console.log(chalk.green(`Page ${currentTrackPageNumber}/${numberOfPages}`));

        tracks = tracks.concat(currentTracksPage.body.items);

        currentTrackPageNumber++;
        if (currentTracksPage.body.next) {
            currentTrackPage = currentTracksPage.body.next;
        } else {
            console.log(chalk.red('No more pages'));
            break;
        }
    }

    console.log(chalk.green(`Found ${tracks.length} tracks`));
}
