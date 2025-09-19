"use client"

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
    messages,
    id
}:{
    messages: {message: String}[];
    id: String
}
){
    const [chats ,setchats] = useState(messages);
    const  {socket, loading} = useSocket();
    const [currentmsg, setcurrentmsg] =useState("");
    useEffect(()=>{
        if(socket && !loading){

            socket.send(JSON.stringify({
                type:"join_room",
                roomId:id
            }));



            socket.onmessage  =(event) =>{
                const parseData = JSON.parse(event.data);
                if(parseData.type === "chat"){
                    setchats(c=> [...c,{message:parseData.message}])

                }
            }
        }
    },[socket,loading, id])

    return(
        <div>
            {chats.map(m=> <div>{m.message}</div>) }

            <input type="text" value={currentmsg} onChange={e=>{
                setcurrentmsg(e.target.value)
            }} />
            <button onClick={()=>{
                socket?.send(JSON.stringify({
                    type:"chat",
                    roomId:id,
                    message:currentmsg
                }))

                setcurrentmsg(" ");
            }}>Send message</button>
        </div>
    )
}