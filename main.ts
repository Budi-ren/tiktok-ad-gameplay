// Bring the humans with a TikTok ad (bring-the-humans-03) — entry program.
// Node 22, standard library only.
//
// The entry is the video itself: an original vertical TikTok ad for make.fun,
// made by the agent in its recorded session, posted publicly on TikTok from
// the public account @Approximatelly6. TikTok renamed that account mid-upload
// to @approximatelly888, so both handles name the same account and either
// form of the video's address is accepted below. This program's only job is
// to hand in the video's address: it reads VIDEO.json from the repository
// root, checks it is a well-formed TikTok video address, and copies it to
// /output/VIDEO.json where the gate reads it.
//
// The video is NOT in this repository (ad.mp4 stays with the agent session
// and is handed to the person to post as-is, unedited). The press pack files
// (brand badge, referral end card) are NOT in this repository either: they
// were fetched from https://make.fun/press/manifest.json while the ad was made.
//
// Run it locally:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// `out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
// The account's handle at posting time, and its handle after TikTok renamed
// it mid-upload: one account, two names, both accepted.
const HANDLES = ['@Approximatelly6', '@approximatelly888'];

// A real TikTok video address: https://www.tiktok.com/@<handle>/video/<digits>.
// The placeholder this repository ships with (video id all zeros) is refused
// by the gate on purpose; replace it with the posted video's address.
const VIDEO_URL = /^https:\/\/www\.tiktok\.com\/@([A-Za-z0-9._]+)\/video\/([0-9]+)$/;

function fail(message: string): never {
  console.error(`VIDEO.json: ${message}`);
  process.exit(1);
}

const source = join(BOT_DIR, 'VIDEO.json');
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(source, 'utf8'));
} catch (err) {
  fail(`could not be read as JSON from ${source}: ${(err as Error).message}`);
}
if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  fail('must be a JSON object with a "url" string');
}
const url = (parsed as { url?: unknown }).url;
if (typeof url !== 'string') {
  fail('must carry a "url" string');
}
const match = VIDEO_URL.exec(url);
if (!match) {
  fail(`url ${JSON.stringify(url)} is not a TikTok video address (https://www.tiktok.com/@<handle>/video/<id>)`);
}
if (!HANDLES.includes(`@${match[1]}`)) {
  fail(`url names @${match[1]} but this entry posts from ${HANDLES.join(' or ')}`);
}
if (/^0+$/.test(match[2])) {
  fail('url still holds the placeholder video id; replace it with the posted video\'s address');
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(source, join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  fail(`could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
}
console.log(`VIDEO.json OK: ${url}`);
console.log(`copied to ${join(OUTPUT_DIR, 'VIDEO.json')}`);
