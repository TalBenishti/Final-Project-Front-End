import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { GameDifficulty } from '../../shared/model/GameDifficulty';

@Injectable({
  providedIn: 'root'
})
export class GamesInformationService {

  //need to change the url to the route of the game
  private games: GameProfile[] = [
    new GameProfile(1, 'Matching Game', 'you need to match words to his translation', GameDifficulty.Easy, 'matching'),
    new GameProfile(2, 'Messy Words Game', 'According to the Hebrew word, arrange the English word according to the given letters', GameDifficulty.Medium, 'messy-words'),
    new GameProfile(3, 'Game 3', 'Description of Game 3', GameDifficulty.Hard, 'https://example.com/game2'),
    new GameProfile(4, 'Game 4', 'Description of Game 4', GameDifficulty.Medium, 'https://example.com/game2'),
    new GameProfile(5, 'Game 5', 'Description of Game 5', GameDifficulty.Medium, 'https://example.com/game2'),
  ];

  constructor() { }

  getGames(): GameProfile[] {
    return this.games;
  }

}
