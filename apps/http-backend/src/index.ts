import express from "express";

const app = express();
import { userrouter } from "./routes/route";
app.use(express.json());

app.use("/backend", userrouter)


app.listen(3001);