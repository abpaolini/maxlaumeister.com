---
title: How to use Google App Engine as a free redirect server
description: This guide will show you how to set up a redirect app on Google App Engine that uses a mapping of input URLS to output URLs to redirect the user depending on the path on your website that they visited.
tags: google app-engine redirect server
---

*This guide will show you how to set up a redirect app on Google App Engine that uses a mapping of input URLS to output URLs to redirect the user depending on the path on your website that they visited.*

In some cases it's useful to have a redirect from one of your domains to another. Many hosting sites allow you to set up a site-wide 302 (temporary) or 301 (permanent) redirect from their control panel, but most only allow either removing the URL path or forwarding it as-is. This means that we could redirect `example1.com/page-a/` to either `example2.com/page-a/` (with the path intact) or `example2.com/` (with the path removed). Using the Google App Engine technique outlined in this article, we can map any arbitrary URL to any other arbitrary URL, for example whenever a user visits `example1.com/page-a/`, they could be redirected to `example2.com/page-b/` or `example3.com/section-c/page-d/`. The cool thing about using Google App Engine for this is that just by serving redirects, we are very unlikely to hit the 1GB daily free outgoing bandwidth quota for App Engine, so the redirect service will be free!

In my case, I'm using this technique as a basic personal URL shortener - for example I can put the short URL `http://maxl.us/puff` on my resume, and when the user types in the URL, they get redirected to the relevant section on my main site, at `http://www.maxlaumeister.com/#puff`. I could also see this technique being used in the case where a user needs more forwarding customization options than their hosting provider gives them, or if they want to redirect requests from one old domain to one of several new domains. So now that you have an idea of when you might want to use this code, let's jump in!

## The Code

All we need for this setup is two files - `app.yaml` is the configuration file for the app, and `main.py` is the actual redirect script.

### App.yaml

Below is the `app.yaml` config file. This file tells Google App Engine the ID of our app and what scripts to use to serve requests:

    runtime: python27
    
    application: your-app-name-here
    version: 1
    api_version: 1
    threadsafe: no
    
    default_expiration: "6h"
    
    handlers:
    - url: /.*
      script: main.app

In the above config file, the `handlers` section specifies that we want every request to the app to be handled by our one main script, so the `main.py` file will do all of the work.

### Main.py

Below is the `main.py` script that does the actual redirects. It's been adapted from a script written by [Dan Tuppeny](http://blog.dantup.com/2010/01/generic-redirection-script-for-google-app-engine/).

    import webapp2
    import logging
    from urlparse import urlparse
    
    # Path => URL to redirect to, redirect type (301 is permanent, 302 is temporary)
    urls = {
        '/': ('http://www.maxlaumeister.com/', '302'), # <-- EDIT THESE ENTRIES
        '/a': ('http://www.maxlaumeister.com/about-ansi.txt', '301'), # <--
        '/cs': ('http://www.maxlaumeister.com/#ucsc-class-search', '301'), # <--
        '/treo': ('https://www.youtube.com/watch?v=3qb3e_S0u_o', '301'), # <--
        '/hex': ('https://github.com/MaxLaumeister/Hex109', '301'), # <--
        '/puff': ('http://www.maxlaumeister.com/#puff', '301') # <--
    }
    
    # If the URL doesn't match any above, a 302 redirect will be done to the following address
    DEFAULT_URL = 'http://www.maxlaumeister.com/' # <-- EDIT THIS DEFAULT URL
    
    def get_redirect_url(url):
        scheme, netloc, path, params, query, fragment = urlparse(url)
    
        # Fix empty paths to be just '/' for consistency
        if path == '':
            path = '/'
    
        # Check if we have a mapping for this url
        if path in urls:
            return urls[path]
        else:
            return None, None
    
    class MainPage(webapp2.RequestHandler):
                
        def get(self):
            # Perform redirect
            url, perm = get_redirect_url(self.request.url)
    
            if url:
                self.redirect(url, permanent= (perm == '301') )
    
            else:
                # Log that we didn't know what this was, and redirect to a good default
                logging.error('Unable to redirect this url: ' + self.request.url);
    
                # Don't do permanent (301), since we don't know what this is.
                self.redirect(DEFAULT_URL, permanent=False)
    
    app = webapp2.WSGIApplication([
        ('/.*', MainPage),
    ])

I have this redirect script running on the domain `maxl.us`, so for example `http://maxl.us/` will be 302-redirected to `http://www.maxlaumeister.com/`, and `http://maxl.us/cs` will be 301-redirected to `http://www.maxlaumeister.com/#ucsc-class-search`. A default URL is also specified (in the `DEFAULT_URL` variable), so if the user visits a path that is not recognized by the script, they will be 302-redirected to a default landing page.

## Uploading the Code

Now that we have the necessary files, we need to create a project for them and upload them to Google App Engine so they start serving!

1. Download the <a href="../static/how-to-use-google-app-engine-as-a-free-redirect-server/app.yaml" download>app.yaml</a> and <a href="../static/how-to-use-google-app-engine-as-a-free-redirect-server/main.py" download>main.py</a> files mentioned above and put them in a new folder on your computer. For our example we will use a folder in our home folder called `redirect-app`.
2. Edit the `urls` dictionary in `main.py` (where it says "<-- EDIT THESE ENTRIES") to match your own redirect situation. The input paths are on the left, and the destination URLS are on the right. Also edit the `DEFAULT_URL` to specify a default redirect location for if none of the paths are matched.
3. Visit the [Google Cloud Platform Console](https://console.cloud.google.com) and click Create Project. Enter a desired project name and a desired project ID.
4. Download and install the [Google App Engine SDK for Python](https://cloud.google.com/appengine/downloads).
5. Using the `appcfg.py` tool from the SDK, run the following command:

       appcfg.py -A YOUR_PROJECT_ID update ~/redirect-app/
   
   Replace `YOUR_PROJECT_ID` with the project ID that you created in step 3, and `~/redirect-app/` with the full path to the folder containing the scripts you downloaded in step 1. Your redirect app should now be available at `your-project-id.appspot.com`.
6. You will likely want to run your redirect app on a custom domain, so attach your own domain by following Google's instructions on [using custom domains and ssl](https://cloud.google.com/appengine/docs/using-custom-domains-and-ssl?hl=en).

## Conclusion

You should now have a Google App Engine app that redirects traffic from URLs on your old domain to whatever destinations you want. And remember that as long as your outgoing bandwidth doesn't exceed the free quota of 1GB, your app will run for free. Special shout-out to Dan Tuppeny for [his code and  article](http://blog.dantup.com/2010/01/generic-redirection-script-for-google-app-engine/) that helped shape this one. Hopefully this article was helpful, and please leave any thoughts in the comments!
