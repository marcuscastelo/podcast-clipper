import { SpotifyTrack } from "../generic-playlist";

export function convertTrackToQueries(track: SpotifyTrack) {
    //TODO: refactor local function
    const listTrackArtists = (track: SpotifyTrack) => track.artists.map(artist => artist.name).join(', ');

    return `${listTrackArtists(track)} - ${track.name}`
}