import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ExitGameComponent } from '../../exit-game/exit-game.component';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../shared/model/category';
import { Router } from '@angular/router';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { WordStatus } from '../../../shared/model/word-status';
import { WordDisplayComponent } from '../word-display/word-display.component';
import { MatDialog } from '@angular/material/dialog';
import { MatchResultDialogComponent } from '../match-result-dialog/match-result-dialog.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-matching-game',
  standalone: true,
  imports: [
    CommonModule,
    ExitGameComponent,
    WordDisplayComponent,
    MatCardModule
  ],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchingGameComponent implements OnInit {
  @Input() categoryId: string = '';
  gameWordList: Category | undefined;
  fiveRandomPairCards: TranslatedWord[] = [];
  targetWords: string[] = new Array(5);
  sourceWordStatuses: WordStatus[] = new Array(5).fill(WordStatus.Normal);
  targetWordStatuses: WordStatus[] = new Array(5).fill(WordStatus.Normal);
  attempts: number = 0;
  successes: number = 0;
  currentPoints: number = 0;
  pointsForCurrentRound: number = 16;
  tempSelectedSourceIndex: number = -1;
  tempTargetSourceIndex: number = -1;

  constructor(private categoriesService: CategoriesService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.gameWordList = this.categoriesService.get(Number(this.categoryId));
    if (this.gameWordList && this.gameWordList.words.length > 5) {
      this.createWordsLists()
    }
  }

  createWordsLists() {
    let usedIndices: number[] = [];
    const size = this.gameWordList?.words.length || 0;
    while (this.fiveRandomPairCards.length < 5) {
      const randomIndex = Math.floor(Math.random() * size);
      if (!usedIndices.includes(randomIndex)) {
        const randomPair = this.gameWordList?.words[randomIndex];
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
      this.currentPoints+=this.pointsForCurrentRound;
      this.pointsForCurrentRound=16;
      this.successes++;
    } else {
      this.pointsForCurrentRound-=2;
      this.openDialog('Incorrect, try again', 'Got it');
      this.sourceWordStatuses[sourceIndex] = WordStatus.Normal;
      this.targetWordStatuses[targetIndex] = WordStatus.Normal;
      this.tempSelectedSourceIndex = -1
      this.tempTargetSourceIndex = -1
    }
  }

  openDialog(message: string, buttonText: string): void {
    const dialogRef = this.dialog.open(MatchResultDialogComponent, {
      data: { message, buttonText },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  navigateToLetsPlay(): void {
    this.router.navigate(['/lets-play']);
  }
}
