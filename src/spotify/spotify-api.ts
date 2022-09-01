import SpotifyWebApi from 'spotify-web-api-node';
import credentials from '../credentials.json';

export const spotifyApi = new SpotifyWebApi({
    clientId: credentials.spotify.clientId,
    clientSecret: credentials.spotify.clientSecret,
    redirectUri: 'http://www.example.com/callback',
});

export async function authenticateSpotify() {
    const token = await spotifyApi.clientCredentialsGrant().then(data => data.body['access_token']);
    console.log(`Spotify token: ${token}`);
    spotifyApi.setAccessToken(token);
}