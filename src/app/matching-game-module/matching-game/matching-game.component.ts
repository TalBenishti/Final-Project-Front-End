import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ExitGameComponent } from '../../exit-game/exit-game.component';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../shared/model/category';
import { Router } from '@angular/router';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { WordStatus } from '../../../shared/model/word-status';

@Component({
  selector: 'app-matching-game',
  standalone: true,
  imports: [
    CommonModule,
    ExitGameComponent,
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
  pointsForCurrentRound: number = 0;

  constructor(private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.gameWordList = this.categoriesService.get(Number(this.categoryId));
    console.log('this.gameWordList', this.gameWordList?.words)
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
    console.log(this.fiveRandomPairCards)
    console.log(this.targetWords)
  }

  navigateToLetsPlay(): void {
    this.router.navigate(['/lets-play']);
  }
}
