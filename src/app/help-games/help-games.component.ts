import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-help-games',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './help-games.component.html',
  styleUrl: './help-games.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpGamesComponent { }
