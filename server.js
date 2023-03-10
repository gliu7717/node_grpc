const grpc = require("@grpc/grpc-js");
const protoLoader = require ("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject =grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;
const server = new grpc.Server();
const port=8080
server.addService(todoPackage.Todo.service,
        {
                "createTodo":createTodo,
                "readTodos": readTodos,
                "readTodosStream": readTodosStream
        });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
  
const todos = [];
function createTodo(call, callback){
        console.log(call);
        const todoItem = {
                "id": todos.length + 1,
                "text": call.request.text
        }
        todos.push(todoItem);
        callback(null, todoItem);

}
function readTodosStream(call,callback){
        todos.forEach(t => call.write(t));
        call.end();
}

function readTodos(call,callback){
        callback(null, {"items": todos});
}