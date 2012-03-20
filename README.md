# Booky #

Booky is a light, real-time bookmark-service. It's designed to share your bookmarks online and collaborate with your friends.

## Setup ##

First of all, make sure node.js and npm is running.

    $ git clone git@github.com:philipp-spiess/booky.git
    $ cd booky
    $ npm install
    $ node app.js

## Production Setup ##

    $ npm install forever -g
    $ export PORT=1337
    $ export NODE_ENV=production
    $ forever start app.js

And if you want apache to forward a subdomain:

    <VirtualHost *:80>
      ServerAdmin booky@example.com
      ServerName booky.example.com
      ServerAlias booky
      ProxyRequests Off
      <Proxy *>
        Order deny,allow
        Allow from all
      </Proxy>
      ProxyPreserveHost on
      ProxyPass / http://localhost:1337/
    </VirtualHost>
