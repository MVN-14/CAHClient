import { type Writable, writable, get } from 'svelte/store';

import { Game, type Player } from '$lib/types';
import type { Socket } from 'socket.io-client';

export const gameStore: Writable<Game> = writable(new Game());
export const socketStore: Writable<Socket> = writable();
export const getPlayer = (socketId: string): Player => {
  const player = get(gameStore).players.find(p => p.socketId === socketId);
  if (!player) {
    throw new Error("Counld't find player with socket id " + socketId);
  }
  return player;
};

