import YTDlpWrap from 'yt-dlp-wrap'
import fs from 'fs';

const BIN_FOLDER = './bin';
const BIN_PATH = `${BIN_FOLDER}/ytdlp-${process.platform}-${process.arch}`;
const TIMEOUT = 20000;


export async function init() {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    if (!fs.existsSync(BIN_PATH)) {
        fs.mkdirSync(BIN_FOLDER, { recursive: true });
        let githubReleasesData = await YTDlpWrap.getGithubReleases(1, 5);
        await YTDlpWrap.downloadFromGithub(BIN_PATH, githubReleasesData[0].tag_name);
        await sleep(1000);
        console.log(githubReleasesData);
    }    
    const ytDlpWrap = new YTDlpWrap(BIN_PATH);

    let stdout = await ytDlpWrap.execPromise([
        'https://www.youtube.com/watch?v=LUPP8hrOWf4&list=PLFoebg0g5-CVkwmnm5WQ9OGL0Tz5mZfa3',
        '--yes-playlist',
        '-x', // extract audio
        '--audio-format', 'mp3',
        '--audio-quality', '0', // best
        '-P', 'downloads',
        '-o', '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s',
    ]);
    console.log(stdout);
}

