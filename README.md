# Travel's Agent crm UI

This sample react application for consuming my travel-agent-crm REST API.

For now it just allows login, logout and get the list of contacts.

when successfully login it gets the jwt in the response body and stores it in local storage for future requests.

### Configuration:
I'm using [Vite.js](https://vitejs.dev/) so the vite.config.js has the __proxy__ configuration to reach the API.
Also dev server __port__ can be changed there.
The __API_URL__ must be also set in [/src/servicer/config](/src/services/config)

### run application:

```console
npm install
npm run dev

```
