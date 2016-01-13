---
title: Running Bitcoin Core on the Raspberry Pi
description: So you’ve decided to run the full Bitcoin client on your Raspberry Pi. Perhaps you want give back to the Bitcoin network, maybe you just want to test how well it runs. There are no official binaries for Bitcoin-qt on Raspberry Pi, so this guide will focus on compiling Bitcoin from source. Fortunately, it’s not too tough – we can follow the official build instructions almost verbatim.
tags: 
- Raspberry Pi
- Bitcoin
- Bitcoin-qt
- Full Node
---

![Bitcoin Raspberry Pi Logo](/img/2013-5-3-running-bitcoin-core-on-the-raspberry-pi/bitpi.png){: .floatleft}

**Update 11 May 2015:** The [Raspberry Pi 2](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/) has been released, and due to the increased RAM, it seems to be more stable than the original Raspberry Pi when running a Bitcoin node. These instructions will work for building on either hardware version.

---

So you’ve decided to run the full Bitcoin client on your Raspberry Pi. Perhaps you want give back to the Bitcoin network, maybe you just want to test how well it runs. There are no official binaries for Bitcoin-qt on Raspberry Pi, so this guide will focus on compiling Bitcoin from source. Fortunately, it’s not too tough – we can follow the official build instructions almost verbatim.

This guide assumes that you are running Raspbian Wheezy, and that you have basic knowledge of the unix command line. Also, make sure you have enough free space on your SD Card to fit the entire Bitcoin blockchain (about 8GB as of this writing). The following commands were tested using a Model B Raspberry Pi with 512MB RAM, so if you have a different model, you may need to change the CPU-GPU memory split to get it to compile (I recommend the raspi-config command line tool for that).

### Preparing to Compile

First, install the prerequisites for Bitcoin-qt. Open a terminal on the Raspberry Pi and run the following:

    sudo apt-get update

    sudo apt-get install qt4-qmake libqt4-dev build-essential \
        libboost-dev libboost-system-dev \
        libboost-filesystem-dev libboost-program-options-dev \
        libboost-thread-dev libssl-dev libdb++-dev \
        libminiupnpc-dev git

Next, download the Bitcoin source code. The easiest way to do this is by using Git to clone the official Github repository. First cd into a directory where you want the project (your home directory is fine). Then run the following command, replacing “0.8.1″ with the branch of the most recent bitcoin version, which you can find on the branches page of the bitcoin project.

    git clone -b 0.8.1 https://github.com/bitcoin/bitcoin.git

This will put a folder called “bitcoin” in your current working directory, containing the Bitcoin source code.

### Compiling Bitcoin

To compile bitcoin, use these commands:

    cd bitcoin
    qmake
    make

That’s it. The qmake will take a few seconds, and make will take a few hours, with the compiler using 100% of the tiny ARM processor. When it’s done, open up a graphical environment if you haven’t already, and run bitcoin from the terminal.

    ./bitcoin-qt
    
The Bitcoin client should pop up and start synchronizing!

DISCLAIMER: Just because Bitcoin runs doesn’t mean it’s stable and that you won’t lose bitcoins. I take no responsibility for lost coins due to the compiler, differences in platform, or for any other reason. Transact at your own risk!
