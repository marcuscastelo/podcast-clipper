import child_process, { ChildProcessWithoutNullStreams } from 'child_process'
import chalk, { stderr } from 'chalk'
import { stdin } from 'process';

export default class Process {
    private nativeProcess?: ChildProcessWithoutNullStreams

    private accumOutput: { err: boolean, data: Buffer }[];
    public stdinPrintFunction: Function = (text: string) => null;
    public stderrPrintFunction: Function = (text: string) => null;

    private running: boolean = false;

    public constructor(private readonly command: string, private readonly args?: readonly string[]) { 
        this.accumOutput = [];
    }

    public spawn() {
        this.running = true;
        this.nativeProcess = child_process.spawn(this.command, this.args);

        this.nativeProcess.stdout.on('data', this.stdinForward.bind(this));
        this.nativeProcess.stderr.on('data', this.sterrForward.bind(this));

        this.nativeProcess.on('close', () => {
            this.running = false;
            this.nativeProcess = undefined;
        });
    }

    public async join() {
        return new Promise((res, rej) => {
            this.nativeProcess?.on('close', () => {
                res(true);
            });

            if (!this.running) return res(false);
        })
    }

    public kill(signal?: NodeJS.Signals | number) {
        this.nativeProcess?.kill(signal);
    }

    public getOutput(filter?: { stdin: boolean, stderr: boolean }, convertToString?: boolean): { converted: true, data: string[] } | { converted: false, data: Buffer[] } {
        filter = filter ?? {stdin: true, stderr: true};
        
        let filtered = this.accumOutput.filter(out => out.err === filter?.stderr || out.err === !filter?.stdin );
        if (convertToString ?? true) return {converted: true, data: filtered.map(out => out.data.toString())};
        else return {converted: false, data: filtered.map(out => out.data)};
    }

    private stdinForward(data: Buffer) {
        this.accumOutput.push({ err: false, data });
        this.stdinPrintFunction(data.toString());
    }

    private sterrForward(data: Buffer) {
        this.accumOutput.push({ err: true, data });
        this.stderrPrintFunction(data.toString());
    }
}