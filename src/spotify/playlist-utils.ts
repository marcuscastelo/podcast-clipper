import { err, errFromMessage, ok, Result } from "../common/result";
import { SpotifyPlaylist, SpotifyTrack } from '../generic-playlist';
import chalk from 'chalk';
import { spotifyApi } from "./spotify-api";

export function getPlaylistId(playlistUrl: string): Result<string, Error> {
    const playlistId = playlistUrl.split('/').pop()?.split('?')[0];

    if (!playlistId)
        return errFromMessage('Invalid playlist URL');

    return ok(playlistId);
}

export async function getFullPlaylist(playlistId: string) {
    const playlistResponse = await spotifyApi.getPlaylist(playlistId);

    if (playlistResponse.body.type !== 'playlist') {
        console.error(chalk.red(`Playlist is not a playlist, it is: ${playlistResponse.body.type}`));
        throw new Error('Invalid playlist type');
    }

    console.log(chalk.green(`Playlist ${playlistResponse.body.name} has ${playlistResponse.body.tracks.total} tracks`));

    // console.log(playlist);

    let currentTrackPage = playlistResponse.body.tracks.href;
    let currentTrackPageNumber = 1;
    let totalTracks = playlistResponse.body.tracks.total;
    let limit = playlistResponse.body.tracks.limit;

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
        name: playlistResponse.body.name,
        id: playlistResponse.body.id,
        href: playlistResponse.body.href,
        collaborative: playlistResponse.body.collaborative,
        tracks: tracks,
    }

    return {
        tracks,
        playlist: RAMPlaylist,
    };
}