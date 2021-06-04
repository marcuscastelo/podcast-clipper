import chalk from 'chalk';
import ffmpeg from 'ffmpeg'
import Process from './process'

const videoFolder = './videos'


type Clip = {
    filename: string,
    start: number,
    end: number,
}

//Limited to one output for now
export default class FFMpeg {
    
};

export async function testSpawnFFMPeg() {

    const globalOptions = [
        '-y' //Say yes to all (e.g. overwriting)
    ]

    const inputFiles = [
        '-i',
        `${videoFolder}/intro.mp4`,
        '-i',
        `${videoFolder}/videotest.mp4`,
        '-i',
        `${videoFolder}/intro.mp4`,
    ]

    const filters = [
        '-filter_complex',
        '"[0:v] [0:a] [1:v] [1:a] [2:v] [2:a] concat=n=3:v=1:a=1 [v] [a]"'
    ]

    const maps = [
        '-map',
        '"[v]"',
        '-map',
        '"[a]"'
    ]

    let proc = new Process(`ffmpeg`, [...globalOptions, ...inputFiles, ...filters, ...maps, `${videoFolder}/out.mkv`]);
    console.log(proc.getCompleteCMD());

    proc.stdoutPrintFunction = (m: string) => console.log(chalk.reset(m));
    proc.stderrPrintFunction = (m: string) => console.error(chalk.red(m));
  
    proc.spawn();
    await proc.join();

}