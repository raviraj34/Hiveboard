import  express ,{Router} from "express";
import jwt from "jsonwebtoken"
export const userrouter :Router=express.Router();
import {z} from 'zod';
import bcrypt from "bcrypt";
import { middleware } from "./middleware";
export const jwt_secret ="raviraj124"
userrouter.post("/signup", async (req,res)=>{
    const {email, password} =req.body;
    const userschema = z.object({
        email:z.string,
        password:z.string
    })
    const hashedpass=bcrypt.hash(password,20)



    const user = await usermodel.create({
        email,
        password
    })

  

    if(!user){
        res.json({
            message:"token authentication failed "
        })
    }
    res.json({
    message:"this is the signup route"
    })
    })
}


userrouter.post("/signin",async (req,res)=>{
  
  const {email,password}= req.body;

  const user =usermodel.findOne({
    email
  })


  const pasmatch =await bcrypt.compare(hashedpass,user.password )

 if(user){


        const token = jwt.sign({
            id:user._Id
        }, jwt_secret)


        res.json({
            token
        }
        )
    }
  
}
)

userrouter.post("/createroom", middleware, (req,res)=>{
    res.json({
        message:"this is the create room routes "
    })
})
