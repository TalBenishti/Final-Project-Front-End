// games-points.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GamesPointsService {
  private storageKey = 'littleLinguistData';
  constructor() {}

  list(): GamePlayed[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addGamePlayed(gamePlayed: GamePlayed): void {
    const gamePlayedList = this.list();
    gamePlayedList.push(gamePlayed);
    localStorage.setItem(this.storageKey, JSON.stringify(gamePlayedList));
  }
}

export class GamePlayed {
  constructor(
    public categoryId: number,
    public gameId: number,
    public date: Date,
    public points: number
  ) {}
}
