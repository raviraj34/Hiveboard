import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){

     const [loading, setloading] =useState(true);
     const [socket, setsocket] = useState<WebSocket>();


     useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NWJmZGRjOS1kZmM0LTQzZDYtOGRlMi1iODdmYWY4NWZjY2QiLCJpYXQiOjE3NTgzOTIyNDUsImV4cCI6MTc1ODM5NTg0NX0.c0dSSBcGYyFymNBOOXBic1XXmvcFE_cYcuLyVtNMKmE`);
        ws.onopen = () =>{
            setloading(false);
            setsocket(ws);
        }
     },[]);

     return {
        socket,
        loading
     }
}

