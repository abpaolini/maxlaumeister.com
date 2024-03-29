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
