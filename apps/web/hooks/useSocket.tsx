import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){

     const [loading, setloading] =useState(true);
     const [socket, setsocket] = useState<WebSocket>();


     useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMTFkZWYyOC03ZjEzLTQzODItOTExZC04NjNhYmMyNjg3ZGMiLCJpYXQiOjE3NTg5NjM2MDUsImV4cCI6MTc1ODk2NzIwNX0.RzA33aBhMAvlPQDNAZaYS1-kyWjiih1-2reOIW31Ao4`);
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

