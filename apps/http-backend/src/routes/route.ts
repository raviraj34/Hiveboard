import express, { Router } from "express";
import jwt from "jsonwebtoken"
export const userrouter: Router = express.Router();
import { z } from 'zod';
import bcrypt from "bcrypt";
import { middleware } from "./middleware";
import { jwt_secret } from "@repo/backend-common/config";
import {createuserschema} from "@repo/common/types"
import { prisma } from "@repo/database/client";
userrouter.post("/signup", async (req, res) => {

   


    const { email, password, name } = req.body;

    const parsing = createuserschema.safeParse(req.body);

    const hashedpass = await bcrypt.hash(password, 20);
    console.log(hashedpass);

    if(!parsing.success){
        res.json({
            message:"invalid inputs"
        })
    }

if (!req.body.email) {
  throw new Error("Email is required");
}
try{


    if (hashedpass) {
    await prisma.user.create({
         data:{
             email:parsing.data?.email!,
             password:parsing.data?.password!,
             name:parsing.data?.name!,
         
         }
     })
     
      } else {
          res.json({
              message: "singup failed "
          })
      }


}catch(e){
    res.json(
        {
            message:"user already exist in the database"
        }
    )
}



})


userrouter.post("/signin",middleware, async (req, res) => {

  const { email, password } = req.body;
const parsed = createuserschema.safeParse(req.body)

 
const user = await prisma.user.findFirst({
    where:{
        email:parsed.data?.email,
        password:parsed.data?.password
    }
})




    if (user) {


        const  token = jwt.sign({
             userId: user?.id
         }, jwt_secret)


         res.json({
             token
         }
         )
     }

 }
)

 userrouter.post("/room",middleware, async (req,res)=>{
   
   const parsedata = createuserschema.safeParse(req.body);

   if(!parsedata.success){
    res.json({
        message:"invalid inputs"
    })
   }
  //@ts-ignore
   const userId= req.userId
   await prisma.room.create({
    data:{
        slug:parsedata.data?.name!,
        adminId:userId
    }
   })
   
   
   
   
    res.json({
         roomId:"123"
     })
 })
