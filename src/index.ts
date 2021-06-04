import fs from 'fs'
import chalk from 'chalk'
import Process from './process'

const intro = './videos/intro.mp4'
const videotest = './videos/videotest.mp4'

const out = './videos/out/out.mp4'

async function main() {
  console.log(`\n\n Iniciando ${chalk.yellow('Podcast clipper')}....\n\n`)

  let proc = new Process('watch', ['-n', '1', 'date']);

  proc.stdinPrintFunction = console.log;
  proc.stderrPrintFunction = console.error;

  proc.spawn();
  await proc.join();

  console.log('Programa encerrado, o stdin completo foi esse: ', proc.getOutput())

  console.log('\n\n Podcast clipper encerrando... Volte sempre! n\n')
}

main();