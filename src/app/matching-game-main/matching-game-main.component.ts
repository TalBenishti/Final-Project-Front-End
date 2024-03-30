import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-matching-game-main',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './matching-game-main.component.html',
  styleUrl: './matching-game-main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchingGameMainComponent { }
