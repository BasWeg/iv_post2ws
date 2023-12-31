# iv_post2ws
The app provides a http and websocket webserver at port 3000 (configurable). 
It receives (indievelo) http post data in json format and forwards these to subscribed websocket clients.


To receive and forward post messages the configured broadcasting urls needs to be like http://localhost:3000/post?channel=focus
(you can use localhost or 127.0.0.1 if the app runs at the same pc as indievelo. If the app runs at a different PC, you need to insert this ip instead of localhost. In addition it is necessary to change the firewall settings to allow tcp for the configured port (e.g. 3000))

## indievelo broadcast settings for running at the same pc:
![indievelo](https://github.com/BasWeg/iv_post2ws/assets/56368122/143d4105-b198-40d3-83c9-66d58d387eae)


## iv_post2ws post to websocket routing:
The data is forwarded to websocket clients which subscribed for the corresponding channel.

```mermaid 
sequenceDiagram 
indieVelo->>iv_post2ws: http://<ip>:3000/post?channel=focus
indieVelo->>iv_post2ws: http://<ip>:3000/post?channel=nearby
client a ->>iv_post2ws: websocket subscribe channel focus
indieVelo->>iv_post2ws: http://<ip>:3000/post?channel=focus
iv_post2ws ->> client a: forward focus data to websocket client a
indieVelo->>iv_post2ws: http://<ip>:3000/post?channel=nearby
client b ->>iv_post2ws: websocket subscribe channel nearby
indieVelo->>iv_post2ws: http://<ip>:3000/post?channel=focus
iv_post2ws ->> client a: forward focus data to websocket client a
indieVelo->>iv_post2ws: http://<ip>:3000/post?channel=nearby
iv_post2ws ->> client b: forward nearby data to websocket client b
client a ->>iv_post2ws: websocket close
indieVelo->>iv_post2ws: http://<ip>:3000/post?channel=focus
indieVelo->>iv_post2ws: http://<ip>:3000/post?channel=nearby
iv_post2ws ->> client b: forward nearby data to websocket client b
```


Please have a look to ./pages/src/index.js or ./pages/src/focus.js how the subscription is handled.

If a post message or websocket subscription arrives with a new channel name, the app does create an new routing MAP for this new channel name. 

The http webserver serves every file under ./pages. Therefore it is possible to add own html pages without rebuilding the app.
To browse a certain .html file, just call http://localhost:3000/myfile.html.

In this example, you can call

http://localhost:3000 for ./pages/index.html

http://localhost:3000/focus.html for ./pages/focus.html

http://localhost:3000/nearby.html for ./pages/nearby.html

# install 
clone this repo, or download files. Browse into app directory and call
`npm install`

# start
within app directory call
`npm start`

# package / create executable
## Install package manager
```
npm install -g pkg
```

## create executable
node <V20:
```
pkg . --target win-x64
```

node V20:
```
pkg . --target latest-win-x64
```
