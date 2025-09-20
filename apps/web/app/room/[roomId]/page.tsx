import axios from "axios";
import { BACKEND_URL } from "../../config";
import { log } from "console";
import { ChatRoom } from "../../../components/ChatRoom";
export async  function getroom(slug: string){
   const  response = await axios.get(`${BACKEND_URL}/room/${slug}`);
   console.log(response.data);
   
   return response.data.room.id;

}


export default async function ChatRoom({
    params
}:{
    params:{
        slug:string
    }
}) {
    const slug = (await params).slug;
    const roomId = await getroom(slug);
//@ts-ignore
    return <ChatRoom id={roomId} ></ChatRoom>

}