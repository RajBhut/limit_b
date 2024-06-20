// const express = require("express");
// const app = express();
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");
import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  
    methods: ["GET", "POST"],
  },
});

let clients = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  clients[socket.id] = { id: socket.id };

  socket.on("join personal", (data) => {
    socket.join(data);
    console.log(`User with id: ${socket.id} joined room: ${data}`);
  });

  socket.on("disconnect", () => {
    delete clients[socket.id];
    io.emit("updateClients", Object.values(clients));
  });

  socket.on("personal msg", (data) => {
    socket.broadcast.to(data.room).emit("personal msg", data.message);
    console.log(data.message);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
