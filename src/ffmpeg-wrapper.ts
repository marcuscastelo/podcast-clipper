import { strict } from 'assert/strict';
import chalk from 'chalk';
import ffmpeg from 'ffmpeg'
import Process from './process'
import { Optional } from 'utility-types'

class Clip {
    constructor(
        public original_filename: string,
        public start: number,
        public end: number,
    ) { }
}

type Range = {start: number, end: number};

const mapRange = ({start, end}: Optional<Range, 'start'>) => 
                    (func: (i: number) => string) =>
                        new Array(end - (start ?? 0)).fill(0)
                            .map((_, index) => func(index + (start ?? 0)))
                            .reduce((a, b) => `${a} ${b}`);


const mapInputs = (inputs: string[]) => inputs.map(inp => ['-i', inp]).reduce((a,b) => [...a, ...b]);

const va = (i: number) =>`[${i}:v] [${i}:a]`;

const createConcatFilter = 
    (inputCount: number) => 
        `${mapRange({end: inputCount})(va)} concat=n=${inputCount}:v=1:a=1 [v] [a]`

//Limited to one output for now
export default class Concatenation {

    private inputFileNames: string[] = [];

    constructor(public readonly outputFileName: string) {}

    public addInputFiles(...inputFileNames: string[]) {
        this.inputFileNames.push(...inputFileNames);
    }

    public async create() {
        const globalOptions = [
            '-y' //Say yes to all (e.g. overwriting)
        ]

        const filters = [
            '-filter_complex',
            `"${createConcatFilter(this.inputFileNames.length)}"`
        ]

        const maps = [
            '-map',
            '"[v]"',
            '-map',
            '"[a]"'
        ]

        const args = [
            ...globalOptions,
            ...mapInputs(this.inputFileNames),
            ...filters,
            ...maps,
            this.outputFileName
        ];
        
        // //TODO: Windows and Mac
        const command = 'ffmpeg';

        // console.log(args)

        let proc = new Process(command, args);
        console.log(proc.getCompleteCMD());

        proc.stdoutPrintFunction = (m: string) => console.log(chalk.reset(m));
        proc.stderrPrintFunction = (m: string) => console.error(chalk.red(m));

        proc.spawn();
        await proc.join();

    }
};