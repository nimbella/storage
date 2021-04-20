const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'lib/index.js',
  minify: true,
  sourcemap: true,
  target: 'node14',
  plugins: [nodeExternalsPlugin()]
}).catch(() => process.exit(1))
