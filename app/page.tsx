"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [state, setState] = useState("Disconnected");
  useEffect(() => {
    const socket = io("http://localhost:4000", {
      autoConnect: true,
      reconnectionAttempts: 3,
    });

    socket.on("connect", () => {
      // console.log("Socket Connected!");
      setState("Connected");
    });

    socket.on("disconnect", () => {
      // console.log("Socket Disconnected!");
      setState("Disconnected");
    });

    socket.io.on("ping", () => {
      // ...
      // console.log("ping");
      setState("Ping");
    });

    socket.io.on("reconnect", (attempt) => {
      // ...
      // console.log(attempt);
      setState("Reconnecting...");
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      // ...
      // console.log(attempt);
      setState("Reconnecting...");
    });

    socket.on("error", (error) => {
      // ...
      // console.log(error);
      setState(error);
    });

    socket.io.on("reconnect_failed", () => {
      // ...
      setState("reconnect_failed");
    });

    socket.io.on("reconnect_error", (error) => {
      // ...
      // console.log(error);

      setState(error.message);
    });

    socket.on("connect_error", (error) => {
      if (socket.active) {
        // temporary failure, the socket will automatically try to reconnect
        // setState("Connected");
        setState("Reconnecting");
      } else {
        // the connection was denied by the server
        // in that case, `socket.connect()` must be manually called in order to reconnect
        socket.connect();
        setState(error.message);
        // console.log(error.message);
      }
    });
  }, []);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="mb-4">Socket.io</h1>
      <div
        className={`w-[100px] h-[100px] rounded-full text-white text-[1rem] text-center pt-8 ${
          state === "Connected" ? "bg-green-900" : "bg-red-900"
        }`}
      >
        {state === "Connected" ? "Online" : "Offline"}
      </div>
    </main>
  );
}
