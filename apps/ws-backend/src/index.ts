import WebSocket, { WebSocketServer } from 'ws';
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { JsonWebTokenError } from 'jsonwebtoken';
import {jwt_secret} from "@repo/backend-common/config"
import { prisma } from "@repo/database/client";
const wss = new WebSocketServer({ port: 8080 });


interface User{
  ws:WebSocket,
  rooms:string[],
  userId: string
}
const users: User[]=[];
function checkuser(token: string):string | null {
 
  try{

    const decoded = jwt.verify(token, jwt_secret);
    if(typeof decoded == "string"){
      return null;
    }
  
    if(!decoded || !decoded.userId){
      return null;
    }
  
    return decoded.userId;
  }catch(e){
    return null;
  }
 
 

}


wss.on('connection', function connection(ws,request) {
  ws.on('error', console.error);
  console.log("ws works");
  const url =request.url;
  if(!url){
    return;
  }
  const queryParams =new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
  const userId = checkuser(token);

  if(userId == null){
    ws.close() 
    return null;
  }


  users.push({
    userId,
    rooms:[],
    ws
  })

  

  

  ws.on('message',async function message(data, isBinary) {
    ws.send("ping")

    const parseddata = JSON.parse(data as unknown as string);
    if(parseddata.type === "join_room"){
       const user = users.find(x=> x.ws === ws);
       user?.rooms.push(parseddata.roomId);
    }
   

    if(parseddata.type === "leave_room"){
      const user = users.find(x => x.ws ===ws);
      if(!user){
        return;
      }

      user.rooms = user?.rooms.filter(x =>x=== parseddata.room);

    }


    if(parseddata.type==="chat"){
      const roomId = parseddata.roomId;
      const message = parseddata.message;


      await prisma.chat.create({
        data:{
          roomId,
          message,
          userId
        }
      });

      users.forEach(user =>{
        if(user.rooms.includes(roomId)){
          user.ws.send(JSON.stringify({
            type:"chat",
            message:message,
            roomId
          }))
        }
        
      })
    }

  });



})