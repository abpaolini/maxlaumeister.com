---
layout: project-page
category: project

title: UCSC Class Search
subtitle: Course browser for Android
project_url: https://git.io/9lgLdQ
preview_text: Native Android app for browsing UCSC course listings
description: Native Android app for browsing UCSC course listings

video_sources:
 - url: classsearch.mp4
   type: video/mp4
 - url: classsearch.webm
   type: video/webm
   
screenshots:
 - classsearch1.png
   
---

### A sleek course browser

UCSC Class Search allows students to browse course listings at University of California, Santa Cruz from an Android device. It was created for the CMPS 121: Mobile Applications course at UCSC. It pulls data from the [public UCSC course browser](https://pisa.ucsc.edu/class_search/) and displays it in a conveniently formatted mobile app. I designed and implemented the user interface, and I wrote the netcode, including the HTML parsing code.

### Tech Stack

UCSC Class Search is written in Java, and compiles and runs on Android as a native app. It uses the [jsoup](http://jsoup.org/) library to parse data from the public course browser. UCSC Class Search is open source for educational purposes, but is not currently under a free license.
