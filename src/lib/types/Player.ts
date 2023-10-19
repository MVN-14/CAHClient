export type Player = {
  ready: boolean;
  playedCard: boolean;
  isCzar: boolean; 
  name: string;
  socketId: string;
  cards: string[];
}
