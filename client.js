const grpc = require('grpc'); 
const protoloader = require('@grpc/proto-loader');

const packageDef = protoloader.loadSync('todo.proto');

//ultimate aim is to create this grpcObject using which we will get the todoPackage (defined in todo.proto) as an Object
const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;


// client listening to the backend server 0.0.0.0:8888 with insecure credentials (HTTP2 required secure by default but 
// we have explicitly set insecure credentials)
const client = new todoPackage.Todo("localhost:8888",grpc.credentials.createInsecure()) 

const text = process.argv[2]

if(text === "read-stream"){
    const call = client.readTodoStream(); //when receiving a stream data we do not get the data from response
    //instead we get call object on which we can set event listener for on "data" and on "end", like so ⬇︎
    call.on("data", (item)=> {
        console.log("received item from server",item)
    })
    call.on("error", (err)=> {
        console.log("error in streaming",err)
    })
    call.on("end", (data)=> {
        console.log("stream finished",data)
    })
}
else if(text === "read-todos"){
    client.readTodos({}, (err,res) =>{
        if(err) console.error(err);
        else console.log("received from server",JSON.stringify(res));
    })
}
else{
    client.createTodo({
        "text": text
    }, (err,res) =>{
        if(err) console.error(err);
        else console.log("received from server",JSON.stringify(res));
    })
}



