const grpc = require("@grpc/grpc-js");
const protoLoader = require ("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("chess.proto", {});
const grpcObject =grpc.loadPackageDefinition(packageDef);
const chessPackage = grpcObject.chessPackage;
const server = new grpc.Server();

server.addService(chessPackage.Chess.service,
        {
                "sendChessMove":sendChessMove,
                "receiveChessMove": receiveChessMove
        });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
  
const moves = [];

function sendChessMove(call, callback){
        console.log(call);
        const move = {
                "step": call.request.step,
                "fromX": call.request.fromX,
                "fromY": call.request.fromY,
                "toX": call.request.toX,
                "toY": call.request.toY
        };
        moves.push(move);
        console.log("sending move " + JSON.stringify(move))
        callback(null, move);
}

function receiveChessMove(call,callback){
	var lastMove = moves.pop();
       console.log("receving move " + JSON.stringify(lastMove))
        callback(null, lastMove);
}