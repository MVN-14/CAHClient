import { Socket, io } from "socket.io-client";
import { PUBLIC_SOCKET_URL } from "$env/static/public";
import { userStore, gameStore } from "../stores"
import type { Player } from "$lib/types";

const { getUsername, getRoomName, cardPlayed, cards } = userStore;
const { players, status, started, prompt } = gameStore;

export function initializeSocket(socket: Socket) {
  socket = io(PUBLIC_SOCKET_URL);
  socket.on("connect", () => {
    console.log("socket connected");

    socket.emit("joinRoom", { username: getUsername(), roomName: getRoomName() });
  });

  cardPlayed.subscribe((card) => {
    if (!card) {
      return;
    }
    socket.emit("cardPlayed", card);
  });

  socket.on("updatePlayers", (newPlayers: Player[]) => {
    players.set(
      newPlayers.map((player) => ({
        name: player.name,
        ready: player.ready,
      }))
    );
  });

  socket.on("recieveWhiteCards", (newCards: string[]) => {
    cards.set([...userStore.getCards(), ...newCards]);
  });

  socket.on("start", () => {
    started.set(true);
  });

  socket.on("serverMessage", (message: string) => {
    status.set(message);
  });

  socket.on("prompt", ({ text }: { text: string }) => {
    prompt.set(text);
  });

  return socket;
}
