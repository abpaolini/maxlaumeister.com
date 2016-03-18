---
layout: project-page
title: BitListen
subtitle: Formerly <i>Listen To Bitcoin</i>
description: Realtime Bitcoin transaction visualizer project by Maximillian Laumeister.

video_thumb: bitlisten.jpg
video_sources:
 - url: bitlisten.mp4
   type: video/mp4
 - url: bitlisten.webm
   type: video/webm
---

### What is BitListen?

Bitcoin is an online currency that can be sent and received by anyone in the world, and BitListen.com is a piece of software I wrote that visualizes everyone sending money to each other. What this means is that every time anyone sends bitcoins to anyone else, a bubble appears on BitListen.com for everyone to see. The bigger the bubble, the more money was sent. If you hang out long enough you may see some pretty large bubbles, sometimes they even fill the whole screen!

### Tech Stack

BitListen is written in Javascript and jQuery, and pulls realtime transaction information via WebSocket from an external API (right now it is using [Toshi.io](https://toshi.io/)). The nature of the Bitcoin network and the WebSocket protocol means that it takes less than 10 seconds between someone clicking the "send money" button in their Bitcoin client and the time that the transaction appears on BitListen.com. In addition to the transaction bubbles, BitListen also keeps up with the Bitcoin exchange rate from [Bitstamp](https://www.bitstamp.net/) and displays it in the upper left.

