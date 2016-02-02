---
title: CSS &lsquo;will-change&rsquo; Property&#58; A Performance Case Study
description: In this article, we will look at the real-world performance gains made possible by the will-change CSS property. I’ll go over some of the background behind the will-change property, what it does, and how to use it to improve the performance of web pages that rely on Javascript animation of DOM elements.
tags: will-change CSS HTML5 performance
---

In this article, we will look at the real-world performance gains made possible by the ``will-change`` CSS property. I’ll go over some of the background behind the ``will-change`` property, what it does, and how to use it to improve the performance of web pages that rely on Javascript animation of DOM elements.

### Introduction

As HTML5 and CSS3 replace Flash as the go-to solution for web-based animation, the W3C has been steadily introducing more features that allow developers to squeeze more performance out of modern web pages. Today we will be discussing a CSS property that was added solely for performance: the ``will-change`` property.

In the previous versions of CSS, to modify the position of an element through Javascript, one needed to modify the ``top`` and ``left`` properties of the element. With the introduction of the CSS transform property, we are able to move elements without the computational overhead of the page layout. This reduces strain on the browser because it results in fewer costly page reflows, wherein the browser recalculates how every element’s properties affect other elements.

However, even when using CSS transforms, modern web browsers will make assumptions about DOM elements to improve performance, and when those assumptions are broken (such as when animating CSS transforms via Javascript), they can actually have a negative performance impact. The ``will-change`` property is one way to mitigate this performance impact by hinting to the browser that a DOM element will be transformed in the near future. This has the effect of offloading some drawing and compositing operations onto the GPU, which can greatly improve page performance for pages with lots of animation. In the past, developers have forced DOM element rendering onto the GPU by setting an empty 3D transform on the element, but that hack is no longer necessary with the introduction of the ``will-change`` property.

### When to use will-change

The ``will-change`` property has the ability to accelerate changes in a variety of CSS properties including scroll position, contents, opacity, and top/left position, but in this article we will be focusing on its use in accelerating CSS transforms. To use will-change to make CSS transforms smoother, attach the property to every element that will have its transform repeatedly modified through Javascript.

In this example, we animate some dots in Javascript and leave others stationary. The ``will-change`` property helps make the animation of the red dots smoother:

<p data-height="268" data-theme-id="0" data-slug-hash="EjKPmX" data-default-tab="result" data-user="maxlaumeister" class='codepen'>See the Pen <a href='http://codepen.io/maxlaumeister/pen/EjKPmX/'>EjKPmX</a> by Maximillian Laumeister (<a href='http://codepen.io/maxlaumeister'>@maxlaumeister</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

We use ``will-change`` on the moving red dots because continuous compositing is done most efficiently on the GPU. We don’t use ``will-change`` on the stationary blue dots because the browser is smart enough to composite them only once, keeping their individual textures out of GPU memory and reducing strain on the GPU. This simple example contains very few moving elements, but as you increase the number of animated elements, the performance gains for using ``will-change`` start to become more compelling. While ``will-change`` optimizes rendering of moving elements, when elements are not moving it’s more efficient to NOT use it, bringing me to my next point:

### When NOT to use will-change

The ``will-change`` property has the potential to improve the performance of DOM elements that are animated using Javascript, but if used incorrectly it can actually have the opposite effect. Under the hood, ``will-change`` is hinting to the browser to use GPU compositing on an element because its properties will change in the future. If you use ``will-change`` on elements with properties that won’t actually change, GPU resources will be expended when they don’t need to be. This causes unnecessary load on the system and can possibly even lead to a page crash with lots of elements. The browser optimizes for static content by default and it knows what’s best, so with unmoving elements, just sit back and let it work its compositing magic.

### Real-world Performance of will-change

All this stuff about using ``will-change`` is fine to talk about from a theoretical standpoint, but what’s the point unless we get some tangible benefit? It turns out that this simple property, when used correctly on animation-heavy pages, visibly increases framerates, decreases stutter, and makes animations look less “janky”. I recently implemented ``will-change`` in one of my animation-heavy web applications, [BitListen](http://www.bitlisten.com/), and it’s had an astoundingly positive outcome on the performance of the site’s animations. The rest of this section will discuss the performance improvements seen.

#### BitListen WITHOUT will-change:

Here is the snippet of CSS from BitListen which styles the moving bubbles that appear in the app:

    .floatableDiv {
	    position: absolute;
	    left: 0;
	    top: 0;
    }

The application uses [window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to update the CSS translation of each div as often as possible to create a smooth animation on the page.

Here are the Chrome profiler results without will-change:

![BitListen Without will-change]({{ '/img/2015-5-12-css-will-change-property-a-performance-case-study/without-will-change.png' | prepend: site.baseurl | replace: '//', '/' }})

Looks like roughly 50fps, with occasional dips under 30fps. Not bad by any means, but not fantastic either. When the frame rate drops, the user sees the bubbles on the screen &ldquo;jump&rdquo; in position as the browser catches up. By the way, the green bars represent the browser rendering the page, and it spends a LOT of time doing it.

#### BitListen WITH will-change:

The same CSS snippet with will-change:

    .floatableDiv {
        position: absolute;
        left: 0;
        top: 0;
        will-change: transform;
    }

And the Chrome profiler results:

![BitListen With will-change]({{ '/img/2015-5-12-css-will-change-property-a-performance-case-study/with-will-change.png' | prepend: site.baseurl | replace: '//', '/' }})

Bingo! With one line of CSS, BitListen launches into hyperspeed! Not once during the profile did the framerate drop below 120fps. The bubble div movement is jank-free and buttery smooth!

### Conclusion

By now you should have noted that ``will-change`` is a powerful tool for increasing animation performance. Remember however that while this power can be used for good, it can also be used for evil (for instance the CSS rule ``* {will-change: transform;}``, don’t ever do that). Be sure to get a rough understanding of what goes on under the hood so you know when and when not to use it. And be sure to remove the ``will-change`` property from elements that won’t be modified in the immediate future, and keep it off of static elements altogether! Hopefully you found this break-down of the ``will-change`` property useful, and will now be able to (smartly) pepper it into your projects for some extra graphics performance!

