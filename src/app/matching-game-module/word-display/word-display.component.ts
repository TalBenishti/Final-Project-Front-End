import { Component, Input } from '@angular/core';
import { WordStatus } from '../../../shared/model/word-status';

@Component({
  selector: 'app-word-display',
  templateUrl: './word-display.component.html',
  styleUrls: ['./word-display.component.css'],
})

export class WordDisplayComponent {
  @Input() word: string | undefined;
  @Input() status: WordStatus = WordStatus.Normal; 

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
