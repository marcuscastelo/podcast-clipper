import chalk from 'chalk'
import { listPlaylistTracksAsQueries } from './spotify-test';

import { program } from 'commander';
import { authenticateSpotify } from './spotify/spotify-api';
import { init } from './ytdlp/ytdlp';

// Define command line options
program.option('-s, --spotify', 'List songs from Spotify and download them via Youtube');
program.option('-y, --youtube', 'List songs directly from YouTube API, and download them');
program.option('-d, --download', 'Test Download YouTube videos');

program.parse();

async function authenticateApis() {
    return Promise.all([authenticateSpotify()]);
}

async function main() {
    const opts = program.opts();
    // Assert only one option is set
    if (Object.keys(opts).length !== 1) {
        console.log(chalk.red('Exactly one option must be set (-s, -y, -d)'));
        process.exit(1);
    }

    
    if (opts.spotify) {
        await authenticateApis();
        const queries = await listPlaylistTracksAsQueries('https://open.spotify.com/playlist/3LrJRcZym9u8ogcdBZwP15?si=6fc0812e2b19466a');
        // TODO: download songs
        // TODO: downloadFromYoutube(queries);
    } else if (opts.youtube) {
        console.log(chalk.red('Not implemented'));
        throw new Error('Not implemented - Vai la vinão');
    } else if (opts.download) { // TODO: define scope
        await init();   
    } else {
        console.log(chalk.red('No option set'));
        process.exit(1);
    }
}

main();