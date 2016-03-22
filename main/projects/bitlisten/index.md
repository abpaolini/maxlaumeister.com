---
layout: project-page
category: project

title: BitListen
subtitle: Bitcoin transaction visualizer
project_url: http://www.bitlisten.com/
preview_text: Software that visualizes Bitcoin transactions in realtime
description: BitListen is a web application that visualizes public Bitcoin transactions in realtime. It is written in HTML, CSS, and Javascript, and it has been featured on NPR and The Verge.

video_sources:
 - url: bitlisten.mp4
   type: video/mp4
 - url: bitlisten.webm
   type: video/webm
   
screenshots:
 - bitlisten1.png
 - bitlisten2.png
   
---

### What is BitListen?

Bitcoin is an online currency that can be sent and received by anyone in the world, and BitListen.com is a piece of software I wrote that visualizes everyone sending money to each other. What this means is that every time anyone sends bitcoins to anyone else, a bubble appears on BitListen.com for everyone to see. The bigger the bubble, the more money was sent. If you hang out long enough you may see some pretty large bubbles, sometimes they even fill the whole screen!

### Publications

BitListen was [featured on National Public Radio (NPR)](http://www.npr.org/2013/08/13/211735430/lawmakers-banking-regulators-take-on-bitcoin) as part of one of their [All Things Considered](http://www.npr.org/programs/all-things-considered/) radio segments. It was also [featured](http://www.theverge.com/2013/3/31/4168542/listen-to-bitcoin-in-real-time) on the front page of the popular tech news source The Verge. It has over 100,000 unique visitors, and has been forked into many different spin-off projects [on GitHub](https://github.com/MaxLaumeister/bitlisten), including [Listen To Wikipedia](http://blog.hatnote.com/post/56856315107/listen-to-wikipedia).

### Tech Stack

BitListen is a client-side web application written in HTML, CSS, Javascript and jQuery, and it pulls realtime transaction information via WebSocket from an external API (right now it is using [Toshi.io](https://toshi.io/)). The nature of the Bitcoin network and the API connection means that it takes less than 10 seconds between someone clicking the "send money" button in their Bitcoin client and the time that the transaction appears on BitListen.com. In addition to the transaction bubbles, BitListen also keeps up with the Bitcoin exchange rate from [Bitstamp](https://www.bitstamp.net/) and displays it in the upper left.

BitListen is [open source](https://github.com/MaxLaumeister/bitlisten) and MIT licensed.
