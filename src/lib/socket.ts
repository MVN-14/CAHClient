import { io } from "socket.io-client";
import { PUBLIC_SOCKET_URL } from "$env/static/public";
import type { Game } from "$lib/types";
import { gameStore, socketStore } from "../stores";

export function initializeSocket(username: string, roomName: string) {
  const socket = io(PUBLIC_SOCKET_URL);
  socket.on("connect", () => {
    console.log("socket connected");

    socket.emit("joinRoom", { username, roomName });
  });

  socket.on("updateGame", (game: Game) => {
    gameStore.set(game);    
  });
  
  socketStore.set(socket);
}
