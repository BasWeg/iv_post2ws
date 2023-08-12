# iv_post2ws
The app provides a http and websocket webserver at port 3000 (configurable). 
It receives (indievelo) http post data in json format and forwards these to subscribed websocket clients.


To receive and forward post messages the configured broadcasting urls needs to be like http://localhost:3000/post?channel=focus

![indievelo](https://github.com/BasWeg/iv_post2ws/assets/56368122/143d4105-b198-40d3-83c9-66d58d387eae)

The data is forwarded to websocket clients which subscribed for the corresponding channel.

![iv_post2ws drawio](https://github.com/BasWeg/iv_post2ws/assets/56368122/94803fd3-f6db-4b9e-a1ef-15dab47f87ce)


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
node <V20:
```
npm install -g pkg
pkg . --target win-x64
```

node V20:
```
pkg . --target latest-win-x64
```
