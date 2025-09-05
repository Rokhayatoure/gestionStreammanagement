import { build } from 'vite';

async function runBuild() {
  try {
    await build({
      root: '.',
      build: {
        outDir: 'dist',
        assetsDir: 'assets'
      }
    });
    console.log('Build réussi !');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

runBuild();
