import fs from 'fs'
import chalk from 'chalk'
import Process from './process'
import Concatenation from './ffmpeg-wrapper'

const intro = './videos/intro.mp4'
const videotest = './videos/videotest.mp4'

const out = './videos/out/out.mp4'

async function main() {
  console.log(`\n\n Iniciando ${chalk.yellow('Podcast clipper')}....\n\n`)

  const concat = new Concatenation('./videos/out.mkv');
  concat.addInputFiles(  
    `./videos/intro.mp4`,
    `./videos/intro.mp4`,
    `./videos/intro.mp4`,
  );

  concat.create();

  
  console.log('\n\n Podcast clipper encerrando... Volte sempre! n\n')
}

main();