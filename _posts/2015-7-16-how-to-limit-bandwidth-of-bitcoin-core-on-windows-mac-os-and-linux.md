---
title: How to Limit Bitcoin Core Bandwidth on Windows, Mac OS X, and Linux
description: In this article, we will learn how to limit the outgoing bandwidth of Bitcoin Core (formerly Bitcoin-qt), so we can leave it listening in the background without completely saturating our internet connection.
tags: 
 - Bitcoin Core
 - Bitcoin-qt
 - Limit Bandwidth
 - Throttle
---

In this article, we will learn how to limit the outgoing bandwidth of Bitcoin Core (formerly Bitcoin-qt), so we can leave it listening in the background without completely saturating our internet connection.

For many of us, leaving Bitcoin Core running isn’t just a way for us to keep tabs on incoming bitcoin transactions, but a way to [contribute resources to the Bitcoin network](https://bitcoin.org/en/full-node). By running Bitcoin Core in the background, your computer acts as a “full node”, forwarding new transactions, providing blocks to other nodes, and generally helping keep the Bitcoin network healthy. To do this, your internet connection needs to be able to [accept incoming connections on TCP port 8333](http://www.lurkmore.com/mining/port8333/), but after you have the port forwarded for a few hours, you may notice Bitcoin Core eating up all of your available upload bandwidth. Some have suggested limiting the amount of outgoing connections to control bandwidth, but this is neither very reliable nor best for the network.

This guide will walk you through how to properly limit the outgoing bandwidth for Bitcoin Core on Windows, Mac OS X, and Linux, so you can use your internet connection normally while contributing to the Bitcoin network in the background.

---

#### Section Navigation

- [Windows](#windows)
- [Mac OS X](#macosx)
- [Linux](#linux)

---

<a name="windows"></a>

### Limiting Bitcoin Bandwidth on Windows

On Windows, there are a few choices available for limiting the bandwidth of an application. Two of the more popular ones are [NetLimiter](http://www.netlimiter.com/) ($29.95, 30-day trial) and [NetBalancer](https://netbalancer.com/) (Free version with limitations, full version $49.95). The free version of NetBalancer allows the user to limit the bandwidth of up to 3 apps at once, and since we only need to limit bandwidth on one app (Bitcoin Core), NetBalancer will be sufficient for this tutorial.

#### How to Limit Bandwidth on Windows:

1. [Download and Install NetBalancer](https://netbalancer.com/).

2. Start Bitcoin Core if it isn't already running.

3. Run NetBalancer and you should see a GUI that looks similar to this:

    ![NetBalancer GUI](/img/2015-7-16-how-to-limit-bandwidth-of-bitcoin-core-on-windows-mac-os-and-linux/netbalancer-1.png)

4. Find “bitcoin-qt.exe” in the list of running applications in the NetBalancer dialog, and double-click it to change its bandwidth rules.

5. Under “Upload Priority”, choose “Limited”, and set the maximum amount of bandwidth for Bitcoin Core to use. Keep in mind that 1KBps (Kilobyte per second, note the uppercase "B") is 8 times as much as 1Kbps (Kilobit per second, lowercase "b"). NetBalancer measures in Kilobytes (KB) by default, but your internet connection is likely measured in Megabits (Mb). So for example if you want to limit Bitcoin Core's bandwidth to 8Mb/s, you will need to enter 1000KB/s into NetBalancer.

    ![NetBalancer Bandwidth Rules](/img/2015-7-16-how-to-limit-bandwidth-of-bitcoin-core-on-windows-mac-os-and-linux/netbalancer-2.png)
    The "bitcoin-qt.exe" entry should show the new rule under the "Priority" column:

    ![NetBalancer Bitcoin-qt Bandwidth](/img/2015-7-16-how-to-limit-bandwidth-of-bitcoin-core-on-windows-mac-os-and-linux/netbalancer-3.png)

6. You’re done! NetBalancer will now sit in the background and make sure Bitcoin Core doesn’t use more bandwidth than you want it to.

<a name="macosx"></a>

### Limiting Bandwidth on Mac OS X

In OS X versions before 10.10, there was a handy tool for shaping traffic bandwidth called [ipfw](https://www.freebsd.org/doc/handbook/firewalls-ipfw.html). In OS X 10.10 and later, however, Apple replaced the ipfw tool with [pfctl](https://www.freebsd.org/cgi/man.cgi?query=pfctl(8)&sektion=), and there are not yet any good, documented ways to limit bandwidth on an app-by-app basis (prove me wrong in the comments!) Apple provides their own method of limiting bandwidth for developers (Network Link Conditioner), but unfortunately it affects the network speed system-wide, rather than allowing the user to choose which apps to throttle.

The result is that on OS X 10.9 Mavericks and earlier, we will be able to control the bandwidth of Bitcoin Core specifically, but on OS X 10.10 Yosemite and later, we will only be able to limit the overall system bandwidth.

#### OS X 10.10 Yosemite and later

For OS X 10.10 Yosemite and later, there is no easy way to limit the bandwidth of a particular application, but the overall system bandwidth can be limited as follows:

1. Visit [Apple Developer Downloads](https://developer.apple.com/downloads/index.action?q=Hardware%20IO%20Tools) and log in with your Apple ID.

2. Search for “Hardware IO Tools for Xcode” and download the latest stable (non-beta) version. As of writing, the download was “Hardware IO Tools for Xcode 6.3”.

3. Open the .dmg and double-click “Network Link Conditioner.prefpane” to install the prefpane.
From now on, you can enable/disable Network Link Conditioner from System Preferences.


    ![Network Link Conditioner - Main](/img/2015-7-16-how-to-limit-bandwidth-of-bitcoin-core-on-windows-mac-os-and-linux/nlc-2.png)

4. From the Network Link Conditioner pane in System Preferences, click “Manage Profiles”, then click the “+” button to add a new profile. I named mine “Bitcoin Core”.

5. Edit the profile and add your desired maximum upload speed:

    ![Network Link Conditioner  - Profile](/img/2015-7-16-how-to-limit-bandwidth-of-bitcoin-core-on-windows-mac-os-and-linux/nlc-1.png)

6. Save your edit, exit the profile manager, and flip the big switch to enable the limiter:

Mac OS will place an icon in your notification tray so you remember that it’s on. Unlike the Windows/Linux solutions, this will limit the bandwidth for your entire system, so be sure to turn it off you’re not running Bitcoin Core.

#### OS X 10.9 Mavericks

For OS X 10.9 Mavericks, [use IceFloor to configure bandwidth rules](http://www.techrepublic.com/article/configure-apples-built-in-network-firewall-with-icefloor/). We want to limit outgoing traffic on TCP Port 8333. Alternatively, if you want a simple way to control the overall system bandwidth limit instead of just Bitcoin Core, follow the instructions above for OS X 10.10 Yosemite and later.

#### OS X 10.8 Mountain Lion and earlier

For OS X 10.8 Mountain Lion and earlier, [use WaterRoof to configure bandwidth rules](http://naleid.com/blog/2008/10/06/how-the-other-half-lives-bandwidth-throttling-on-the-mac-using-waterroofipfw). We want to limit outgoing traffic on TCP Port 8333. Alternatively, if you want a simple way to control the overall system bandwidth limit instead of just Bitcoin Core, follow the instructions above for OS X 10.10 Yosemite and later.

<a name="linux"></a>

### Limiting Bandwidth on Linux

There are comparatively many tools for limiting bandwidth on Linux compared to Windows and Mac OS, but I've found that not all of them are as reliable as others. [Trickle](http://linux.die.net/man/1/trickle) is a popular way to limit a program’s bandwidth, but after a few tests under Linux Mint 17.1, I found it to consistently crash Bitcoin Core after a few hours of uptime. [Wondershaper](https://github.com/magnific0/wondershaper) is another “plug and go” bandwidth limiting solution, but only allows bandwidth limiting on an entire adapter, not for a specific application or port. [Tc](http://linux.die.net/man/8/tc) isn’t as user-friendly as the other two, but in my tests it has been the most reliable, so that’s what we will use for this tutorial.

1. Make sure you have tc installed by typing `tc` at the command line. If you get “command not found”, install tc using your favorite package manager. If you're on a Debian-based distribution, the easiest way to install tc is by using the commands `sudo apt-get update`, then `sudo apt-get install tc`.

2. Download the tc.sh script from the official Bitcoin Core repository by using the command:

    `wget https://raw.githubusercontent.com/bitcoin/bitcoin/master/contrib/qos/tc.sh`

3. Open the script in a text editor. Find the line that says `IF="eth0"` and change `eth0` to reflect the network interface that your internet connection runs through. To get a list of your computer's network interfaces, use `ifconfig` on the command line. My computer is connected wirelessly through `wlan1`, so the IF line of my tc.sh looks like this:

    `IF="wlan1"`

4. LINKCEIL should reflect the limit of the network interface, and most likely does not need to be changed.

    `LINKCEIL="1gbit"`

5. Change LIMIT to be the maximum bandwidth you want Bitcoin Core to use (I chose 1mbit). If you don’t have any other Bitcoin Core nodes in your local network, you can delete the line that says LOCALNET. This line is there to make a bandwidth exception for port 8333 communications within your local network (i.e. not out to the internet).

    `LIMIT="1mbit"`

    Leave the rest of the commands in tc.sh alone unless you know what you're doing. The top section of my tc.sh ended up looking like this:

        #network interface on which to limit traffic
        IF="wlan1"

        #limit of the network interface in question
        LINKCEIL="1gbit"

        #limit outbound Bitcoin protocol traffic to this rate
        LIMIT="1mbit"

6. Exit your editor and make the script executable with the following command:

    `chmod +x ./tc.sh`

7. Run the script as superuser:

    `sudo ./tc.sh`

Your Bitcoin Core bandwidth will be throttled until you reboot your computer. The steps for getting the bash script to run on boot will vary depending on your Linux distribution. On Ubuntu, [one of the ways to run a script on boot](http://askubuntu.com/a/1199/379181) is by adding the script to your `/etc/rc.local` file.

### Conclusion

Now you can contribute your extra bandwidth to the Bitcoin network no matter what OS you're running, and without making the connection slow for anyone else. Hope you enjoyed this tutorial, and please leave any thoughts in the comments!
