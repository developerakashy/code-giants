// // server.js

// // Importing required modules
// import http from 'http';
// import { Server } from 'socket.io';
// import express from 'express';

// const app = express();

// // Define CORS origins (can be set from environment variables or defaults)
// const allOrigin = process.env.CORS_ORIGIN?.split(",") || ["*"]; // Allow all origins by default

// // Creating the HTTP server
// const server = http.createServer(app);

// // Setting up the Socket.IO server with CORS configuration
// const io = new Server(server, {
//   cors: {
//     origin: allOrigin, // Use the provided CORS origins or allow all
//     methods: ["GET", "POST"], // Allowed HTTP methods
//   },
// });

// // Socket.io event handling when a client connects
// io.on("connection", (socket) => {
//   console.log(`A user connected: ${socket.id}`);

//   // Handle message from client
//   socket.on("send_message", (message) => {
//     console.log("Message from client:", message);
//     // Broadcasting the message to all connected clients
//     io.emit("receive_message", message);
//   });

//   // Handle disconnection event
//   socket.on("disconnect", () => {
//     console.log(`A user disconnected: ${socket.id}`);
//   });
// });

// // Exporting the io object for use in other parts of the app (like routes or other modules)
// export { io };

// // Start the server
// const PORT =  5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
