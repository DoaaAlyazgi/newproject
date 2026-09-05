/**
 * Packages the production build into ONE self-contained HTML file, so the
 * prototype can be opened from a single link (or a file on a USB stick) with
 * no server, no install and no build step.
 *
 *   npm run build && node scripts/make-singlefile.mjs
 *   -> dist/global-medal-prototype.html
 *
 * The output deliberately omits <html>/<head>/<body> wrappers: it is written to
 * be dropped straight into a host page. Browsers open it directly all the same.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const assets = readdirSync(join(DIST, 'assets'));

const cssFile = assets.find((f) => f.endsWith('.css'));
const jsFile = assets.find((f) => f.endsWith('.js'));
if (!cssFile || !jsFile) throw new Error('Run `npm run build` first.');

const css = readFileSync(join(DIST, 'assets', cssFile), 'utf8');
// A literal </script> inside the bundle would close the tag we are inlining it into.
const js = readFileSync(join(DIST, 'assets', jsFile), 'utf8').replace(/<\/script/gi, '<\\/script');

const html = `<title>Global Medal Awards Assistant</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@400;500;700&display=swap" rel="stylesheet">
<style>
${css}
</style>
<div id="root"></div>
<script type="module">
${js}
</script>
`;

const out = join(DIST, 'global-medal-prototype.html');
writeFileSync(out, html, 'utf8');
console.log(`${out} — ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`);
