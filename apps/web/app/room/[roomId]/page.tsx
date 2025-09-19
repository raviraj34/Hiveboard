import axios from "axios";
import { BACKEND_URL } from "../../config";
import { log } from "console";
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

    return <div>

        
    </div>

}