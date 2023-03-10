const grpc = require("@grpc/grpc-js");
const protoLoader = require ("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject =grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const text =process.argv[2];

//const client=new todoPackage.Todo("0.0.0.0:50051",grpc.credentials.createInsecure())
const client=new todoPackage.Todo("192.9.133.7:40000",grpc.credentials.createInsecure())
//const client=new todoPackage.Todo("150.136.175.102:8080",grpc.credentials.createInsecure())

client.createTodo({
   "id": -1,
   "text": text
}, (err, response) => {
   console.log("Received from server " + JSON.stringify(response))
})

client.readTodos( {},(err,response) => {
   console.log("Received from server " + JSON.stringify(response));

})

const call = client.readTodosStream();
call.on("data", item => {
        console.log("recevied item from server " + JSON.stringify(item))
})
call.on("end", e=>console.log("server done"))
