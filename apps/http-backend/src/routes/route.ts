import express, { Router } from "express";
import jwt from "jsonwebtoken"
export const userrouter: Router = express.Router();
import { z } from 'zod';
import bcrypt from "bcrypt";
import { middleware } from "./middleware";
import { jwt_secret } from "@repo/backend-common/config";
import {createuserschema} from :"@repo/common/types"

userrouter.post("/signup", async (req, res) => {

   


    const { email, password, name } = req.body;

    const parsing = createuserschema.safeParse(req.body);

    const hashedpass = await bcrypt.hash(password, 20);
    console.log(hashedpass);

    if (hashedpass) {

        //db call
    } else {
        res.json({
            message: "singup failed "
        })
    }










})


userrouter.post("/signin", async (req, res) => {

    const { email, password } = req.body;

  //  const user = await usermodel.findOne({
        email:email
 //   })


  //  const pasmatch = await bcrypt.compare(password, user.password)

    if (pasmatch) {


       const  token = jwt.sign({
            id: user._Id.toString()
        }, jwt_secret)


        res.json({
            token
        }
        )
    }

}
)

userrouter.post("/room",middleware, (req,res)=>{
    
})