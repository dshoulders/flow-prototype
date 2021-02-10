const startService = require('esbuild').startService;
const FileList = require('filelist').FileList;
const rimraf = require('rimraf').sync;
const copyfiles = require('copyfiles');
const { performance } = require('perf_hooks');

const clean = (cb) => {

    console.log('Removing out directory')

    // Remove output directory
    rimraf('out');

    console.log('Copying static files')

    // Copy static files
    copyfiles(['src/index.html', 'src/css/**/*', 'out'], 1, cb);
}

const build = async () => {

    console.log('Build started');

    const startTime = performance.now();

    // Create a list of files to process with esbuild
    const fl = new FileList();
    fl.include('src/**/*.js');
    fl.include('src/**/*.ts');

    // Start build service
    const service = await startService();

    try {
        await service.build({
            color: true,
            entryPoints: fl.toArray(),
            outdir: 'out/js',
            logLevel: 'error',
            target: 'es2020',
            format: 'esm'
        });

        const endTime = performance.now();

        console.log(`Build finished in ${Math.round(endTime - startTime) / 1000} seconds`)
    } catch (e) {
        console.log(e);
    } finally {
        service.stop();
    }
};

clean(build);
