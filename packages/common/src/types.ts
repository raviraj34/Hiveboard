 import {z} from "zod";
 
 
 export const createuserschema = z.object({
        email: z.string().max(32).min(2),
        password: z.string().max(33),
        name: z.string().max(23).min(34)
    })




 export const signinschema = z.object({
        email: z.string().max(32).min(2),
        password: z.string().max(33)
    })



 export const createroomschema = z.object({
        name: z.string().max(23).min(34)
    })