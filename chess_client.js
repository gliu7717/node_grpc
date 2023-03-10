const grpc = require("@grpc/grpc-js");
const protoLoader = require ("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("chess.proto", {});
const grpcObject =grpc.loadPackageDefinition(packageDef);
const chessPackage = grpcObject.chessPackage;

const text =process.argv[2];

//const client=new chessPackage.Chess("0.0.0.0:50051",grpc.credentials.createInsecure())
//const client=new chessPackage.Chess("192.9.133.7//:40//000",grpc.credentials.createInsecure())
const client=new chessPackage.Chess("150.136.175.102:8080",grpc.credentials.createInsecure())

client.sendChessMove({
   "step": 2,
   "fromX": 7,
   "fromY": 1,
   "toX":7,
   "toY":3
}, (err, response) => {
   console.log("Received from server " + JSON.stringify(response))
})

client.receiveChessMove( {},(err,response) => {
   console.log("Received from server " + JSON.stringify(response));

})

