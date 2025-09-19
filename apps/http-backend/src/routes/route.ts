import express, { Router } from "express";
import jwt from "jsonwebtoken"
export const userrouter: Router = express.Router();
import { z } from 'zod';
import bcrypt from "bcrypt";
import { middleware } from "./middleware";
import { jwt_secret } from "@repo/backend-common/config";
import { createroomschema, createuserschema, signinschema } from "@repo/common/types"
import { prisma } from "@repo/database/client";
userrouter.post("/signup", async (req, res) => {




    const { email, password, name } = req.body;

    const parsing = createuserschema.safeParse(req.body);

    const hashedpass = await bcrypt.hash(password, 20);
    console.log(hashedpass);

    if (!parsing.success) {
        res.json({
            message: "invalid inputs"
        })
    }

    if (!req.body.email) {
        throw new Error("Email is required");
    }
    try {


        if (hashedpass) {
            const user = await prisma.user.create({
                data: {
                    email: parsing.data?.email!,
                    password: parsing.data?.password!,
                    name: parsing.data?.name!,

                }
            })
            res.json({
                userId: user.id
            })

        } else {
            res.json({
                message: "singup failed "
            })
        }


    } catch (e) {
        res.json(
            {
                message: "user already exist in the database"
            }
        )
    }



})


userrouter.post("/signin", async (req, res) => {

    const { email, password } = req.body;
    const parsed = signinschema.safeParse(req.body)


    const user = await prisma.user.findFirst({
        where: {
            email: parsed.data?.email,
            password: parsed.data?.password
        }
    })

    if (!user) {
        res.json({
            message: "user not found"
        })
    }



    if (user) {


        const token = jwt.sign(
            { userId: user?.id },
            jwt_secret,
            { expiresIn: "1h" }
        );

        console.log("Token generated:", token, "with secret:", jwt_secret);
        console.log(token);


        res.json({
            token
        }
        )
    }

}
)

userrouter.post("/room", middleware, async (req, res) => {

    const parsedata = createroomschema.safeParse(req.body);

    if (!parsedata.success) {
        res.json({
            message: "invalid inputs"
        })
        return;
    }
    //@ts-ignore
    const userId = req.userId

    try {

        const room = await prisma.room.create({
            data: {
                slug: parsedata.data?.name!,
                adminId: userId
            }
        })


        res.json({
            roomId: room.id
        })

    } catch (e) {
        res.json({
            message: "slug already exist"
        })
    }





})


userrouter.get("/chats/:roomId", async (req,res)=>{
 try{

     const roomId = Number(req.params.roomId);
     console.log(req.params.roomId);
     
     const messages = await prisma.chat.findMany({
         where:{
             roomId: roomId
         },
         orderBy:{
             id:"desc"
         },
         take: 50
     });
    
     res.json({
         messages
     })


 }catch(e){
    console.log(e);
    res.json({
        message:[]
    })
    
 }
 
})




userrouter.get("/room/:slug",async (req,res)=>{
    const slug = req.params.slug;
    const room = await prisma.room.findFirst({
        where:{
            slug 
             }
    
    });

    res.json({
        room
    })
})