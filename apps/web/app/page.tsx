"use client"
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home(){
  const [roomId, setRoomId]= useState("");
  const router = useRouter();
 
 
  return(

    <div>
      <input type="text" name="input" id="2" value={roomId}  onChange={(e)=>{
        setRoomId(e.target.value);

      }} placeholder="enter roomId"/>

      <button onClick={()=>{
        router.push(`/backend/room/${roomId}`)
      }}>join room</button>
    </div>


  )
}
