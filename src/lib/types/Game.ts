import type { Card, Player } from "./";

export class Game {
  started: boolean = false;
  status: string = "";
  statusMessage: string = "";
  players: Player[] = [];
  prompt?: { text: string, pick: number };
  playedCards: Card[] = [];
  choosing: boolean = false;

  getPlayer(socketId: string): Player {
    const player = this.players.find(p => p.socketId === socketId);
    if (!player) {
      throw new Error(`Failed to find player with socket id ${socketId}`)
    }
    return player;
  }
}
