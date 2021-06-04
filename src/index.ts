import fs from 'fs'
import chalk from 'chalk'
import Process from './process'
import FFMpeg, {testSpawnFFMPeg} from './ffmpeg-wrapper'

const intro = './videos/intro.mp4'
const videotest = './videos/videotest.mp4'

const out = './videos/out/out.mp4'

async function main() {
  console.log(`\n\n Iniciando ${chalk.yellow('Podcast clipper')}....\n\n`)

  await testSpawnFFMPeg();

  // let proc = new Process('echo', ['oi', '"a b c d e "']);
  // proc.stdoutPrintFunction = console.log;
  // proc.spawn();
  // await proc.join();

  console.log('\n\n Podcast clipper encerrando... Volte sempre! n\n')
}

main();