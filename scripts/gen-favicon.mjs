import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../src/app');

const SVG = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="nGMain" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#dce7ff"/><stop offset="50%" stop-color="#b4c5ff"/><stop offset="100%" stop-color="#8fa8ff"/></linearGradient><linearGradient id="nGSharp" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#b4c5ff"/></linearGradient><radialGradient id="nGBg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#b4c5ff" stop-opacity="0.55"/><stop offset="50%" stop-color="#b4c5ff" stop-opacity="0.22"/><stop offset="100%" stop-color="#b4c5ff" stop-opacity="0"/></radialGradient><radialGradient id="nGDot" cx="35%" cy="30%" r="65%"><stop offset="0%" stop-color="#ffffff"/><stop offset="40%" stop-color="#b4c5ff"/><stop offset="100%" stop-color="#6a8fe0"/></radialGradient><linearGradient id="nGWhite" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="rgba(255,255,255,0.0)"/><stop offset="100%" stop-color="rgba(255,255,255,0.18)"/></linearGradient><filter id="nGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><filter id="nSGlow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="200" height="200" rx="38" fill="#08081a"/><circle cx="100" cy="102" r="80" fill="url(#nGBg)"/><circle cx="100" cy="102" r="80" fill="none" stroke="#b4c5ff" stroke-width="1.5" opacity="0.45"/><circle cx="100" cy="102" r="62" fill="none" stroke="#b4c5ff" stroke-width="1.2" opacity="0.3"/><circle cx="100" cy="102" r="44" fill="none" stroke="#b4c5ff" stroke-width="1" opacity="0.2"/><circle cx="100" cy="102" r="26" fill="none" stroke="#b4c5ff" stroke-width="0.8" opacity="0.14"/><g transform="skewX(-8)"><line x1="66" y1="44" x2="66" y2="158" stroke="url(#nGMain)" stroke-width="14" stroke-linecap="round"/><line x1="50" y1="158" x2="84" y2="158" stroke="url(#nGMain)" stroke-width="10" stroke-linecap="round"/><line x1="50" y1="44" x2="84" y2="44" stroke="url(#nGMain)" stroke-width="10" stroke-linecap="round"/><line x1="58" y1="108" x2="142" y2="88" stroke="url(#nGSharp)" stroke-width="9" stroke-linecap="round" opacity="0.9"/><path d="M108 48 Q162 48 162 102 Q162 156 108 156" stroke="url(#nGMain)" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="162" cy="48" r="22" fill="#b4c5ff" opacity="0.18" filter="url(#nGlow)"/><circle cx="162" cy="48" r="14" fill="url(#nGDot)" filter="url(#nSGlow)"/><circle cx="162" cy="48" r="14" fill="none" stroke="white" stroke-width="1.5" opacity="0.4"/><ellipse cx="157" cy="43" rx="5" ry="4" fill="white" opacity="0.7"/><circle cx="168" cy="54" r="2" fill="white" opacity="0.45"/></g><rect width="200" height="200" rx="38" fill="url(#nGWhite)"/></svg>`;

function renderPng(size) {
  const resvg = new Resvg(SVG, {
    fitTo: { mode: 'width', value: size },
  });
  return resvg.render().asPng();
}

// ICO 파일 생성 (16x16, 32x32 두 사이즈 포함)
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * count;

  let dataOffset = headerSize + dirSize;
  const entries = [];
  for (const buf of pngBuffers) {
    entries.push({ buf, offset: dataOffset });
    dataOffset += buf.length;
  }

  const totalSize = dataOffset;
  const ico = Buffer.alloc(totalSize);

  // ICONDIR header
  ico.writeUInt16LE(0, 0);       // reserved
  ico.writeUInt16LE(1, 2);       // type: ICO
  ico.writeUInt16LE(count, 4);   // count

  // ICONDIRENTRY × count
  let pos = headerSize;
  for (const { buf, offset } of entries) {
    // PNG 헤더에서 width/height 읽기 (offset 16, 20)
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    ico.writeUInt8(w >= 256 ? 0 : w, pos);      // width (0 = 256)
    ico.writeUInt8(h >= 256 ? 0 : h, pos + 1);  // height
    ico.writeUInt8(0, pos + 2);   // color count
    ico.writeUInt8(0, pos + 3);   // reserved
    ico.writeUInt16LE(1, pos + 4);  // color planes
    ico.writeUInt16LE(32, pos + 6); // bit count
    ico.writeUInt32LE(buf.length, pos + 8);  // size
    ico.writeUInt32LE(offset, pos + 12);     // offset
    pos += dirEntrySize;
  }

  // PNG data
  for (const { buf, offset } of entries) {
    buf.copy(ico, offset);
  }

  return ico;
}

const png16 = renderPng(16);
const png32 = renderPng(32);
const png48 = renderPng(48);

const ico = buildIco([png16, png32, png48]);
writeFileSync(resolve(OUT, 'favicon.ico'), ico);
console.log('favicon.ico 생성 완료 (16×16, 32×32, 48×48)');

// SVG favicon (현대 브라우저용)
writeFileSync(resolve(OUT, 'icon.svg'), SVG);
console.log('icon.svg 생성 완료');

// Apple touch icon (180×180)
writeFileSync(resolve(OUT, 'apple-icon.png'), renderPng(180));
console.log('apple-icon.png 생성 완료 (180×180)');
