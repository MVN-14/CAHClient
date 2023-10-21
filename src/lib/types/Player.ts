export type Player = {
  ready: boolean;
  playedCards: number;
  isCzar: boolean;
  name: string;
  socketId: string;
  cards: string[];
  points: number;
}
