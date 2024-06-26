import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ExitGameComponent } from "../../../exit-game/exit-game.component";
import { CurrentPointsComponent } from "../../../current-points/current-points.component";
import { Category } from '../../../../shared/model/category';
import { CategoriesService } from '../../../services/categories.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GameResultDialogComponent } from '../../../../shared/dialog/game-result-dialog/game-result-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GamesPlayedService } from '../../../services/gamesPlayed.service';
import { TimerComponent } from "../../../timer/timer.component";
import { GamePlayed } from '../../../../shared/model/GamePlayed';

@Component({
  selector: 'app-messy-words-game',
  standalone: true,
  templateUrl: './messy-words-game.component.html',
  styleUrl: './messy-words-game.component.css',
  imports: [
    FormsModule,
    CommonModule,
    ExitGameComponent,
    CurrentPointsComponent,
    GameResultDialogComponent,
    MatIconModule,
    MatProgressBarModule,
    TimerComponent
  ]
})
export class MessyWordsGameComponent implements OnInit {
  @Input() categoryId: string = '';
  choosenCategory: Category | undefined;
  shuffledList: Category | undefined;
  shuffledWordList: string[] = [];
  roundPoints: number = 0;
  round: number = 0;
  successesGuesses: boolean[] = [];
  currentPoints: number = 0;
  wordGuess: string = '';
  gameDuration: number = 120;
  timeLeft: number = 0;
  gameEnd: boolean = false;

  constructor(private categoriesService: CategoriesService, private router: Router, private dialog: MatDialog, private gamesPlayedService: GamesPlayedService) { }

  ngOnInit(): void {
    this.categoriesService.get(this.categoryId).then(
      (categoryFromService) => {
        if (categoryFromService) {
          this.choosenCategory = categoryFromService;
        }
        if (this.choosenCategory) {
          this.shuffledList = { ...this.choosenCategory };
          this.shuffleWordsList();
          this.roundPoints = Math.floor(100 / this.choosenCategory.words.length);
        }
      }
    );
    
  }

  shuffleWordsList(): void {
    if (this.shuffledList) {
      for (let i = this.shuffledList.words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.shuffledList.words[i], this.shuffledList.words[j]] = [this.shuffledList.words[j], this.shuffledList.words[i]];
      }
      for (let i = 0; i < this.shuffledList.words.length; i++) {
        this.shuffledWordList[i] = this.shuffleWord(this.shuffledList.words[i].origin)
      }
    }
  }

  shuffleWord(word: string): string {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join(' ');
  }

  checkGuess(): void {
    if (
      this.wordGuess.toLowerCase() ===
      this.shuffledList?.words[this.round].origin.toLowerCase()
    ) {
      this.openDialog('Great job!', 'Continue');
      this.successesGuesses[this.round] = true;
      this.currentPoints += this.roundPoints;
    }
    else {
      this.openDialog('Incorrect, try again', 'Got it');
      this.successesGuesses[this.round] = false;
    }
    this.round++;
    this.wordGuess = '';
    if (this.round === this.shuffledList?.words.length) {
      if (this.successesGuesses.filter(g => g === true).length === this.round) {
        this.currentPoints = 100;
      }
      this.endGame();
    }
  }

  openDialog(message: string, buttonText: string): void {
    const dialogRef = this.dialog.open(GameResultDialogComponent, {
      data: { message, buttonText },
      height: '200px',
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  navigateToLetsPlay(): void {
    this.router.navigate(['/lets-play']);
  }

  onTimeLeft(timeLeft: number): void {
    this.timeLeft = timeLeft;
    if (this.timeLeft <= 0) {
      this.endGame();
    }
  }

  endGame(): void {
    const gameData = new GamePlayed(
      this.categoryId,
      2,
      new Date(),
      this.currentPoints,
      this.timeLeft,
      this.gameDuration - this.timeLeft
    );
    this.gameEnd=true;
    this.gamesPlayedService.addGamePlayed(gameData);
  }
}
