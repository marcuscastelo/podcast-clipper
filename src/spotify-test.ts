import assert from 'assert';
import chalk from 'chalk';
import SpotifyWebApi from 'spotify-web-api-node';
import credentials from './credentials.json';
import { SpotifyPlaylist, SpotifyTrack } from './generic-playlist';

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

    if (playlist.body.type !== 'playlist') {
        console.error(chalk.red(`Playlist is not a playlist, it is: ${playlist.body.type}`));
        throw new Error('Invalid playlist type');
    }

    console.log(chalk.green(`Playlist ${playlist.body.name} has ${playlist.body.tracks.total} tracks`));

    // console.log(playlist);

    let currentTrackPage = playlist.body.tracks.href;
    let currentTrackPageNumber = 1;
    let totalTracks = playlist.body.tracks.total;
    let limit = playlist.body.tracks.limit;

    let tracks: SpotifyTrack[] = [];

    const numberOfPages = Math.ceil(totalTracks / limit) || 1;
    while (currentTrackPageNumber <= numberOfPages) {
        const currentTracksPage = await spotifyApi.getPlaylistTracks(playlistId, {
            limit: limit,
            offset: (currentTrackPageNumber - 1) * limit,
        });

        const firstTrack = currentTracksPage.body.items[0];

        console.log(chalk.green(`Page ${currentTrackPageNumber}/${numberOfPages}`));

        const tracksPage: SpotifyTrack[] = currentTracksPage.body.items.map(track => {
            let song = track.track;
            if (!song) {
                throw new Error('Invalid track');
            }
            return {
                id: song.id,
                name: song.name,
                artists: song.artists.map(artist => ({
                    id: artist.id,
                    name: artist.name,
                    href: artist.href,
                })),
                album: {
                    albumType: song.album.album_type,
                    artists: song.album.artists.map(artist => ({
                        id: artist.id,
                        name: artist.name,
                        href: artist.href,
                    })),
                    href: song.album.href,
                    id: song.album.id,
                    name: song.album.name,
                    releaseDate: song.album.release_date,
                    releaseDatePrecision: song.album.release_date_precision,
                    totalTracks: song.album.total_tracks,
                    type: song.album.type,
                },
                durationMs: song.duration_ms,
                href: song.href,
                explicit: song.explicit,
                episode: (<any>song).episode,
                popularity: song.popularity,
                track: true,
                type: song.type,
            };
        });


        tracks = tracks.concat(tracksPage);

        currentTrackPageNumber++;
        if (currentTracksPage.body.next) {
            currentTrackPage = currentTracksPage.body.next;
        } else {
            console.log(chalk.red('No more pages'));
            break;
        }
    }

    let RAMPlaylist: SpotifyPlaylist = {
        name: playlist.body.name,
        id: playlist.body.id,
        href: playlist.body.href,
        collaborative: playlist.body.collaborative,
        tracks: tracks,
    }


    console.log(chalk.green(`Found ${tracks.length} tracks`));
    //Print first track
    // console.dir(RAMPlaylist);
    //Print as json with indentation
    console.log(JSON.stringify(RAMPlaylist, null, 2));
}
