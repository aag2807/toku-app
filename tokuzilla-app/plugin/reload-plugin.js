const childProcess = require('child_process');

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
                this.currentProcess = childProcess.exec('node ./dist/bundle.js', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }

                    console.log(`stdout: ${stdout}`);
                    console.error(`stderr: ${stderr}`);
                });

            }, 200);
        });
    }
};
