import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, r, g, b) {
  // Simple uncompressed or deflate PNG generator
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type RGB
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  
  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(4 + 4 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4);
    data.copy(buf, 8);
    // CRC calculation
    const crc = crc32(buf.subarray(4, 8 + len));
    buf.writeInt32BE(crc, 8 + len);
    return buf;
  }

  // Pre-calculated or CRC32 function
  function crc32(buf) {
    let c = 0xffffffff;
    for (let n = 0; n < buf.length; n++) {
      c = (c ^ buf[n]);
      for (let k = 0; k < 8; k++) {
        c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
      }
    }
    return (c ^ 0xffffffff) | 0;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw image scanlines: filter byte (0) + 3 bytes per pixel
  const scanlineLength = 1 + width * 3;
  const rawData = Buffer.alloc(scanlineLength * height);

  for (let y = 0; y < height; y++) {
    const lineStart = y * scanlineLength;
    rawData[lineStart] = 0; // Filter: none
    for (let x = 0; x < width; x++) {
      const px = lineStart + 1 + x * 3;
      // create a nice green gradient with a leaf-like center
      const dx = (x - width / 2) / (width / 2);
      const dy = (y - height / 2) / (height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.75) {
        rawData[px] = 34;   // R
        rawData[px + 1] = 197; // G
        rawData[px + 2] = 94;  // B
      } else {
        rawData[px] = 21;   // R (Dark Forest Green)
        rawData[px + 1] = 128; // G
        rawData[px + 2] = 61;  // B
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const pubDir = path.resolve('public');
if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });

fs.writeFileSync(path.join(pubDir, 'icon-192.png'), createPng(192, 192, 21, 128, 61));
fs.writeFileSync(path.join(pubDir, 'icon-512.png'), createPng(512, 512, 21, 128, 61));
console.log('Generated icon-192.png and icon-512.png successfully!');
