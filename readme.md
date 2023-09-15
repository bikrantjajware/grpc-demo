# grpc-demo
A small todo list application just for grpc demo. Works on cli

# running server

node server.js  // start listening on server

# running client
1. node clients.js read-todos // read todo list using request-response model
2. node client.js read-stream // read stream from server usinh HTTP 2 streams to send the data
3. node client.js <any string> // adds string into todo list array, simple request-response
