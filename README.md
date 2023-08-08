# iv_post2ws
receives (indievelo) http post data and forwards these to subscribed websocket clients

The app starts a http and websocket webserver at port 3000. 
To receive and forward post messages the url needs to be like http://localhost:3000/post?channel=<mychannel>

The data is forwarded to websocket clients which subscribed for the corresponding channel.

Please have a look to ./pages/index.js or ./pages/focus.js how the subscription is handled.

The webserver serves every file under ./pages. So to call a certain .html file, just call http://localhost:3000/<myfile>.html.

In this example, you can call

http://localhost:3000 for ./pages/index.html
http://localhost:3000/focus.html for ./pages/focus.html

