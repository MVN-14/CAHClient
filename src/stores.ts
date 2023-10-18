import { writable, type Writable, get } from 'svelte/store';
import type { Player } from '$lib/types/Player';

class UserStore {
  constructor(
    public cards: Writable<string[]> = writable([]),
    public cardPlayed: Writable<string> = writable(""),
    public isCzar: Writable<boolean> = writable(false),
    public username: Writable<string> = writable(""),
    public roomName: Writable<string> = writable(""),
  ) { }
  
  // methods for non svelte files
  getCards() {
    return get(this.cards);
  }

  getUsername = () => {
    return get(this.username);
  }

  getRoomName = () => {
    return get(this.roomName);
  }
};

class GameStore {
  constructor(
    public started: Writable<boolean> = writable(false),
    public players: Writable<Player[]> = writable([]),
    public status: Writable<string> = writable(""),
    public prompt: Writable<string> = writable(""),
  ) { }
  
  // methods for non svelte files
  getStatus = () =>  {
    return get(this.status);
  }
};

export const userStore = new UserStore();
export const gameStore = new GameStore();


