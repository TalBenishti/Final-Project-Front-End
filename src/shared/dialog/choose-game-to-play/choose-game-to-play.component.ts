import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GamesInformationService } from '../../../app/services/gamesInformation.service';
import { GameProfile } from '../../model/GameProfile';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-choose-game-to-play',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, CommonModule],
  templateUrl: './choose-game-to-play.component.html',
  styleUrl: './choose-game-to-play.component.css'
})
export class ChooseGameToPlayComponent implements OnInit {

  gameList: GameProfile[] = [];
  selectedGame: GameProfile | undefined;

  constructor(private gamesInformationService: GamesInformationService) { }

  ngOnInit(): void {
    this.gameList = this.gamesInformationService.getGames();
  }

  onGameSelectionChange(): void {
    console.log('Selected Game:', this.selectedGame);
  }

  playGame(): void {
    console.log('in playGame')
  }
}
