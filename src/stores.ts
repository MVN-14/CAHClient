import { writable, type Writable } from 'svelte/store';
import type { Player } from './routes/room/[room]/Player';

class UserStore {
  constructor(
    public cards: Writable<string[]> = writable([]),
    public cardPlayed: Writable<string> = writable(""),
    public isCzar: Writable<boolean> = writable(false),
  ) { }

};

class GameStore {
  constructor(
    public started: Writable<boolean> = writable(false),
    public players: Writable<Player[]> = writable([])
  ) { }
};

export const userStore = new UserStore();
export const gameStore = new GameStore();


