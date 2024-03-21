import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app--game-categories',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './ gameCategories.component.html',
  styleUrl: './ gameCategories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCategoriesComponent { }
