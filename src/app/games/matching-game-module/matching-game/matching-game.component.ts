import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ExitGameComponent } from '../../../exit-game/exit-game.component';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../../shared/model/category';
import { Router } from '@angular/router';
import { TranslatedWord } from '../../../../shared/model/translated-word';
import { WordStatus } from '../../../../shared/model/word-status';
import { WordDisplayComponent } from '../word-display/word-display.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { GameResultDialogComponent } from '../../../../shared/dialog/game-result-dialog/game-result-dialog.component';
import { CurrentPointsComponent } from '../../../current-points/current-points.component';
import { GamesPlayedService } from '../../../services/gamesPlayed.service';
import { TimerComponent } from "../../../timer/timer.component";
import { GamePlayed } from '../../../../shared/model/GamePlayed';

@Component({
  selector: 'app-matching-game',
  standalone: true,
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css',
  imports: [
    CommonModule,
    ExitGameComponent,
    GameResultDialogComponent,
    WordDisplayComponent,
    CurrentPointsComponent,
    MatCardModule,
    TimerComponent
  ]
})
export class MatchingGameComponent implements OnInit {
  @Input() categoryId: string = '';
  choosenCategory: Category | undefined;
  fiveRandomPairCards: TranslatedWord[] = [];
  targetWords: string[] = new Array(5);
  sourceWordStatuses: WordStatus[] = new Array(5).fill(WordStatus.Normal);
  targetWordStatuses: WordStatus[] = new Array(5).fill(WordStatus.Normal);
  attempts: number = 0;
  successes: number = 0;
  currentPoints: number = 0;
  pointsForCurrentRound: number = 20;
  tempSelectedSourceIndex: number = -1;
  tempTargetSourceIndex: number = -1;
  gameDuration: number = 60;
  timeLeft: number = 0;
  gameEnd: boolean = false;

  constructor(private categoriesService: CategoriesService, private router: Router, private dialog: MatDialog, private gamesPlayedService: GamesPlayedService) { }

  ngOnInit(): void {
    this.categoriesService.get(this.categoryId).then(
      (categoryFromService) => {
        if (categoryFromService) {
          this.choosenCategory = categoryFromService;
        }
        if (this.choosenCategory && this.choosenCategory.words.length >= 5) {
          this.createWordsLists()
        }
      }
    );

  }

  createWordsLists() {
    let usedIndices: number[] = [];
    const size = this.choosenCategory?.words.length || 0;
    while (this.fiveRandomPairCards.length < 5) {
      const randomIndex = Math.floor(Math.random() * size);
      if (!usedIndices.includes(randomIndex)) {
        const randomPair = this.choosenCategory?.words[randomIndex];
        if (randomPair) {
          this.fiveRandomPairCards.push(randomPair);
          usedIndices.push(randomIndex);
        }
      }
    }
    this.fiveRandomPairCards.forEach(pair => {
      let randomIndex: number;
      do {
        randomIndex = Math.floor(Math.random() * 5);
      } while (this.targetWords[randomIndex]);
      this.targetWords[randomIndex] = pair.target;
    });
  }

  handleCardClicked(index: number, type: 'source' | 'target'): void {
    if (type === 'source') {
      if (this.tempSelectedSourceIndex !== -1) {
        this.sourceWordStatuses[this.tempSelectedSourceIndex] = WordStatus.Normal;
      }
      this.sourceWordStatuses[index] = WordStatus.Selected;
      this.tempSelectedSourceIndex = index;
    } else if (type === 'target') {
      if (this.tempTargetSourceIndex !== -1) {
        this.targetWordStatuses[this.tempTargetSourceIndex] = WordStatus.Normal;
      }
      this.targetWordStatuses[index] = WordStatus.Selected;
      this.tempTargetSourceIndex = index;
    }

    if (this.tempSelectedSourceIndex !== -1 && this.tempTargetSourceIndex !== -1) {
      this.attempts++;
      this.checkAnswer(this.tempSelectedSourceIndex, this.tempTargetSourceIndex);
    }
  }

  checkAnswer(sourceIndex: number, targetIndex: number): void {
    const sourceWord = this.fiveRandomPairCards[sourceIndex].target;
    const targetWord = this.targetWords[targetIndex];

    if (sourceWord === targetWord) {
      this.openDialog('Great job!', 'Continue');
      this.sourceWordStatuses[sourceIndex] = WordStatus.Disabled;
      this.targetWordStatuses[targetIndex] = WordStatus.Disabled;
      this.tempSelectedSourceIndex = -1
      this.tempTargetSourceIndex = -1
      this.currentPoints += this.pointsForCurrentRound;
      this.pointsForCurrentRound = 20;
      this.successes++;
    } else {
      if (this.pointsForCurrentRound > 0) {
        this.pointsForCurrentRound -= 2;
      }
      this.openDialog('Incorrect, try again', 'Got it');
      this.sourceWordStatuses[sourceIndex] = WordStatus.Normal;
      this.targetWordStatuses[targetIndex] = WordStatus.Normal;
      this.tempSelectedSourceIndex = -1
      this.tempTargetSourceIndex = -1
    }
    if (this.successes === 5) {
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
      1,
      new Date(),
      this.currentPoints,
      this.timeLeft,
      this.gameDuration - this.timeLeft
    );
    this.gamesPlayedService.addGamePlayed(gameData);
    this.gameEnd = true;
  }
}
