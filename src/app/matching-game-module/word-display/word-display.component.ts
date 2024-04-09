import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WordStatus } from '../../../shared/model/word-status';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-word-display',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './word-display.component.html',
  styleUrls: ['./word-display.component.css'],
})

export class WordDisplayComponent {
  @Input() word: string | undefined;
  @Input() status: WordStatus = WordStatus.Normal; 
  @Output() cardClicked: EventEmitter<void> = new EventEmitter<void>(); 

  getStatusClass(): string {
    switch (this.status) {
      case WordStatus.Normal:
        return 'normal';
      case WordStatus.Selected:
        return 'selected';
      case WordStatus.Disabled:
        return 'disabled';
      default:
        return '';
    }
  }
}
