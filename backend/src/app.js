import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import http from 'http';
import { Server } from 'socket.io';


//creating app
const app=express();
const allOrigin=process.env.CORS_ORIGIN?.split(",")
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
      origin: allOrigin,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  

// Socket.io event handling when a client connects
io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);
  
    // Handle message from client
    socket.on("send_message", (message) => {
      console.log("Message from client:", message);
      // Broadcasting the message to all connected clients
      io.emit("receive_message", message);
    });
  
    // Handle disconnection event
    socket.on("disconnect", () => {
      console.log(`A user disconnected: ${socket.id}`);
    });
  });
  
app.use(cors({
    origin: allOrigin,
    credentials:true,
}))
// let set the file type which  we will except and give
app.use(express.json({limit:"1mb"}));
//let use urlencoded
app.use(express.urlencoded({extended:true,limit:"16kb"}))
// let set static folder for the image 
app.use(express.static("public"))
// let set the cookie-parser
app.use(cookieParser());
//let's use authentication middleWare


 
// let's get the user route and use some url path as middleware for the user route 
// let's use it
import userRoute from "../routes/user.routes.js";



// all route middleware is here
app.use("/user",userRoute);



//export this app

export default server ;
