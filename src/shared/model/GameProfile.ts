import { GameDifficulty } from "./GameDifficulty";

export class GameProfile {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public difficulty: GameDifficulty,
      public url: string
    ) {}
  }
  