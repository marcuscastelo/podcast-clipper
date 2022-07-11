import chalk from 'chalk'
import { testSpotify } from './spotify-test';

import { program } from 'commander';
program.option('-s, --spotify', 'Test Spotify API');
program.option('-y, --youtube', 'Test YouTube API');
program.option('-d, --download', 'Download YouTube videos');

program.parse();

async function main() {
    const opts = program.opts();
    // Assert only one option is set
    if (Object.keys(opts).length !== 1) {
        console.log(chalk.red('Exactly one option must be set'));
        process.exit(1);
    }

    if (opts.spotify) {
        await testSpotify();
    } else if (opts.youtube) {
        console.log(chalk.red('Not implemented'));
        throw new Error('Not implemented - Vai la vinão');
    } else if (opts.download) {
        console.log(chalk.red('Not implemented'));
        throw new Error('Not implemented');
    } else {
        console.log(chalk.red('No option set'));
        process.exit(1);
    }
}

main();