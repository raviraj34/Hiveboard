import WebSocket, { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken";
import { JsonWebTokenError } from 'jsonwebtoken';
import {jwt_secret} from "@repo/backend-common/config"
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,request) {
  ws.on('error', console.error);
  console.log("ws works");
  const url =request.url;
  if(!url){
    return;
  }
  const queryParams =new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
const decoded = jwt.verify(token, jwt_secret)
  if(!decoded || !(decoded as JwtPayload).userId){
    ws.close();
    return;
  }

  

  ws.on('message', function message(data, isBinary) {
    ws.send("ping")
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});