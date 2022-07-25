export interface YoutubeTrack {} // TODO: create
export interface YoutubePlaylist {} // TODO: create
export interface SpotifyPlaylist {
    id: string;
    name: string;
    href: string;
    collaborative: boolean;
    tracks: SpotifyTrack[];
}

export interface SpotifyTrack {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    durationMs: number;
    href: string;
    explicit: boolean;
    episode: boolean;
    popularity: number;
    track: boolean; //TODO: type === 'track' vs track=true ?
    type: string;
}

export interface SpotifyArtist {
    id: string;
    name: string;
    href: string;
}

export interface SpotifyAlbum {
    albumType: string;
    artists: SpotifyArtist[];
    href: string;
    id: string;
    name: string;
    releaseDate: string;
    releaseDatePrecision: string;
    totalTracks: number;
    type: string;
}

export interface SpotifyPlaylistOwner {
    displayName: string;
    id: string;
    href: string;
    type: string;
}

export interface GenericArtist {
    name: string;
}

export interface GenericAlbum {
    name: string;
}

export interface GenericTrack {
    name: string;
    durationMs?: number;
    artists?: GenericArtist[];
    album?: GenericAlbum;
    originalTrack?: SpotifyTrack | YoutubeTrack;
}

export interface GenericPlaylist {
    name?: string;
    tracks: GenericTrack[];
    originalPlaylist?: SpotifyPlaylist | YoutubePlaylist;
}

