const {spawn} = require('child_process');

module.exports = class WatchFileAndRun {
    constructor() {
        this.currentProcess = null;
    }

    apply(compiler) {
        compiler.hooks.done.tap('Runner', () => {
            if (this.currentProcess) {
                this.currentProcess.kill();
                this.currentProcess = null;
                console.log('Killed the previous process\n\n');
            }

            console.log('Starting the new process\n\n');
            setTimeout(() => {
                this.currentProcess = spawn('node', ['./dist/bundle.js'], {stdio: 'inherit'});
            }, 200);
        });
    }
};
