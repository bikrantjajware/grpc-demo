const grpc = require('grpc'); 
const protoloader = require('@grpc/proto-loader');

const packageDef = protoloader.loadSync('todo.proto');

//ultimate aim is to create this grpcObject using which we will get the todoPackage (defined in todo.proto) as an Object
const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;


const server = new grpc.Server()

server.bind("0.0.0.0:8888",grpc.ServerCredentials.createInsecure ())


server.addService(todoPackage.Todo.service,{
    "createTodo": createTodo,
    "readTodos": readTodos,
    "readTodoStream": readTodoStream
})

server.start();
const todos = []


/**
 * 
 * @param {*} call: this contains the info from client side, ( i guess hussein mentions even TCP packet info )
 * @param {*} callback this is what will be send back to the client side
 */
function createTodo(call,callback){
    const item = {...call.request,id: todos.length+1 }
    todos.push(item)
    callback(null,item)// 1st argument is the size of payload (item), if null it'll be calculated auto

}

function readTodos(call,callback){
    callback(null,{ items: todos})
}

function readTodos(call,callback){
    callback(null,{ items: todos})
}


function readTodoStream(call,callback){
    // callback(null) so we don't use callback in streaming, instead we use call to write data back
    todos.forEach(todo => call.write(todo)) //we can add more logic here like sleep duration between items to let client finish processing
    call.end()
}