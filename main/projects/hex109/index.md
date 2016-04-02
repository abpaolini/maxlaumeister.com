---
layout: project-page
categories: [project, more-project]

title: Hex 109
subtitle: Hex board game with Monte Carlo AI
project_url: https://git.io/HL-QNQ
preview_text: Hex board game with Monte Carlo AI
description: 'Hex109 is a command line C++ implementation of Game of Hex, with a text interface and a Monte Carlo AI. I created it as a requirement of the CMPS 109: Advanced Programming course at University of California, Santa Cruz.'
   
img: hex109-1.png
   
screenshots:
 - hex109-1.png
 - hex109-2.png
   
---

### A board game with integrated AI

Hex109 is a command line C++ implementation of the [Game of Hex](http://en.wikipedia.org/wiki/Hex_(board_game)) board game, with a text interface and a Monte Carlo AI. I created it as a requirement of the CMPS 109: Advanced Programming course at University of California, Santa Cruz.

### Game of Hex Rules

> Each player has an allocated color, conventionally Red and Blue or White and Black. Players take turns placing a stone of their color on a single cell within the overall playing board. The goal for each player is to form a connected path of their own stones linking the opposing sides of the board marked by their colors, before their opponent connects his or her sides in a similar fashion. The first player to complete his or her connection wins the game.<br><br>
<cite>[Hex (board game) - Wikipedia](https://en.wikipedia.org/wiki/Hex_(board_game))</cite>

In my implementation of Hex, the player controls White and the CPU controls Black. The player is trying to connect their chips horizontally, whereas the CPU opponent is trying to connect its chips vertically. My AI is surprisingly tricky for being of the Monte Carlo type, but with a bit of practice you will be able to beat it most of the time. Because of the random nature of the Monte Carlo simulation, the AI is non-deterministic, which means that it won't always make the same move in response to yours.

### Tech Stack

Hex109 is written purely in C++, and takes advantage of the C/C++ standard libraries. It is [available on GitHub](https://github.com/MaxLaumeister/Hex109) under the MIT license.
