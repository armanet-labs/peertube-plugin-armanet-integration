const path = require('path');
const esbuild = require('esbuild');
const { externalGlobalPlugin } = require('esbuild-plugin-external-global');

const clientFiles = [
  'video-watch-client-plugin.js',
  'embed-client-plugin.js',
  'admin-plugin-client-plugin.js',
];

const configs = clientFiles.map((f) => ({
  entryPoints: [path.resolve(__dirname, '..', 'client', f)],
  bundle: true,
  minify: false,
  // format: 'iife',
  globalName: 'ArmanetPlugin',
  format: 'esm',
  target: 'safari11',
  outfile: path.resolve(__dirname, '..', 'dist', f),
  loader: {
    '.js': 'jsx',
    '.mjs': 'jsx',
    '.css': 'css',
  },
  platform: 'browser',
  plugins: [
    externalGlobalPlugin({
      // 'video.js': 'videojs',
      // 'video.js': 'window.videojs',
      // 'video.js': 'window.videojs',
      // 'video.js': 'window.videojs',
      // 'global/document': 'window.document',
      // 'global/window': 'window',
      // 'global': 'window',
      //'@dailymotion/vast-client': 'window.DMVAST',
      // 'vpaid-html5-client': 'window.VPAIDHTML5Client'
    }),
  ],
  define: {
    //'videojs': 'window.videojs',
    // 'video.js',
    // 'global',
    // 'global/document.js',
    // 'global/window.js',
    'global': 'window',
    'global.document': 'document',
    'global.window': 'window',
    // '@dailymotion/vast-client',
    // 'vpaid-html5-client'
  },
}));

const promises = configs.map((c) => esbuild.build(c));

Promise.all(promises).catch(() => process.exit(1));
