const fs = require('fs');
const path = require('path');
const { build } = require('esbuild');

const srcDir = './lib/functions/';
const outDir = './lib/functions/dist';

// Read all the files in the source directory
const files = fs.readdirSync(srcDir);

// Bundle each file using esbuild
for (const file of files) {
    if (path.extname(file) === '.js') {
        build({
            entryPoints: [path.join(srcDir, file)],
            outfile: path.join(outDir, file),
            bundle: true,
            format: 'esm',
            sourcemap: true,
            external: ['@aws-appsync/utils'],
            minify: false,
            target: ['node14'],
        })
            .then(() => console.log(`Bundled ${file}`))
            .catch((err) => console.error(`Error bundling ${file}: ${err}`));
    }
}
