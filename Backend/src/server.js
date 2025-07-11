import express from "express"; 
import dotenv from "dotenv";
import cors from "cors";

import rateLimit from "express-rate-limit"; 
import notesRoutes from "./routes/notesRoutes.js"; 
import {connectDB} from "./config/db.js";

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 10, 
    message: "Too many requests from this IP, please try again later."
});
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(limiter);
// app.use((req,res,next)=>{
//     console.log(`Req Method is ${req.method} and req url is ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes); 

app.get("/", (req, res) => {
  res.send("Welcome to the Thinkboard API!");
});


connectDB().then(()=>{
    app.listen(5001, () => {
        console.log("Server is running on PORT",PORT);
    }); 
});
