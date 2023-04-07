# SocketIO Trial project
This is a trial react app to connect to a SocketIO server.
It is used to connect 


### Configuration
You should set __WS_URL__ and __API_URL__ in [/src/servicer/config](/src/services/config) 

For developement server, configure vite proxy server to point to API host in [vite.config.js](vite.config.js)

This app is related to [this](https://github.com/federicomorella/flask-socketIO-trial-api) API repository.

A web service automatically deploy tha API to https://flask-socketio.onrender.com so you can set __WS_URL__ and __API_URL__ to point there.

### Run dev server
``` console
npm run dev
```
### Build app
``` console
npm run build
```
