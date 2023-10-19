import type { Player } from "./";

export class Game {
  started: boolean = false;
  status: string = "";
  players: Player[] = [];
  prompt?: {text: string, pick: number};
  playedCards: {card: string}[] = [];

  getPlayer(socketId: string): Player {
    const player = this.players.find(p => p.socketId === socketId);
    if (!player) {
      throw new Error(`Failed to find player with socket id ${socketId}`)
    }
    return player;
  }
}
