import  express ,{Router} from "express";

export const userrouter :Router=express.Router();

userrouter.post("/signup", (req,res)=>{
    res.json({
        message:"this is the signup route"
    })
})

userrouter.post("/signin", (req,res)=>{
    res.json({
        message:"this is the signin route"
    }
    )
}
)
