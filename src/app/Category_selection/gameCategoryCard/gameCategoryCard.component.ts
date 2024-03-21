import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game-category-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gameCategoryCard.component.html',
  styleUrl: './gameCategoryCard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCategoryCardComponent { }
