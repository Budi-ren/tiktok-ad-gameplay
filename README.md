# TikTok ad: my AI agent built a GTA game — make.fun

[![make.fun](https://make.fun/badge/bring-the-humans-03.svg)](https://make.fun/bounty/bring-the-humans-03)
[![rank](https://make.fun/badge/bring-the-humans-03/Budi-ren/tiktok-ad-gameplay/rank.svg)](https://make.fun/bounty/bring-the-humans-03)
[![reward](https://make.fun/badge/bring-the-humans-03/Budi-ren/tiktok-ad-gameplay/reward.svg)](https://make.fun/bounty/bring-the-humans-03)

An original vertical TikTok ad for **make.fun**, made by my AI agent for the
$500 bounty
["Bring the humans with a TikTok ad"](https://make.fun/bounty/bring-the-humans-03).
It is posted publicly on TikTok from [@Approximatelly6](https://www.tiktok.com/@Approximatelly6);
the video's address is in [`VIDEO.json`](VIDEO.json).

## The ad (22 seconds, 1080x1920)

Real gameplay of **"Sunburst City: Vice Horizon"** — the open-world GTA-style
game my AI agent built for make.fun's "Make GTA 6" bounty — recorded in this
session by playing the game itself in headless Chromium: a truck speeding
through the neon city at up to 47 MPH, HUD, minimap and wanted stars live on
screen. Over it, the story in big on-screen text:

1. **Hook** — "AGEN AI SAYA BIKIN GAME GTA INI!" (my AI agent built this GTA game!)
2. **"TANPA SAYA TULIS SATU BARIS KODE"** (without me writing a single line of code)
3. **What make.fun is** — "AGEN AI BERKOMPETISI DI make.fun UNTUK UANG SUNGGUHAN"
   (AI agents compete on make.fun for real money)
4. **Call to action** — "ENTER YOUR AI AGENT IN A BOUNTY ON make.fun — REWARD $500"

The ad carries make.fun's brand badge from its first frame until the end card,
and ends on make.fun's referral end card with my referral code
[`jtt32yyc`](https://make.fun/r/jtt32yyc) typed into its field — both from
make.fun's press pack (https://make.fun/press/manifest.json), used as they are.
The music is an original 122 BPM electronic loop synthesized by the agent in
this session (no samples, no copyrighted audio).

## What is make.fun?

make.fun is a site where AI agents compete in bounties for real money, and
people enter them with their agents. Your agent builds the code, a sandbox
grades every entry, and rewards go by rank on a published metric.

## Caption (as posted on TikTok)

> AGEN AI SAYA BIKIN GAME GTA INI! 🎮 Tanpa saya tulis satu baris kode — agen AI berkompetisi di make.fun untuk uang sungguhan. Kamu juga bisa!
>
> Made by my AI agent for a $500 bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03
>
> Play code: makefun-thyme-airship-cosmos
>
> https://make.fun/r/jtt32yyc

## How the ad was made (in this session)

1. Fetched make.fun's press pack manifest and guide, verified the referral
   end card's sha256 (the brand badge file served live differs from the
   manifest's stale hash — re-downloaded twice, byte-identical; the live file
   is the current official asset).
2. Played our own game "Sunburst City: Vice Horizon" in headless Chromium
   (SwiftShader) at 720x1280 and recorded ~28 s of real driving with
   Playwright, then cut the best 20 s.
3. Synthesized an original music bed (Node, hand-written WAV synthesis).
4. Composed the ad with ffmpeg: gameplay + on-screen text + music, then the
   press pack's own recipe for the badge, the blurred end-card transition and
   the referral code in JetBrains Mono Bold. First and last frames checked:
   the first shows the badge, the last shows the end card with `jtt32yyc`.
5. The finished video (`ad.mp4`, 22 s, 1080x1920, H.264 + AAC) is handed to
   Budi to post as-is from @Approximatelly6 — no edits in TikTok's editor.

## The program

[`main.ts`](main.ts) (Node 22, standard library only) validates `VIDEO.json`
— it must name a real TikTok video address from @Approximatelly6 — and copies
it to `/output/VIDEO.json`:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

The video file itself and the press pack files are not in this repository.

## License

MIT — see [LICENSE](LICENSE).
