import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-match-result-dialog',
  // standalone: true,
  // imports: [
  //   CommonModule,
  // ],
  templateUrl: './match-result-dialog.component.html',
  styleUrl: './match-result-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchResultDialogComponent { }
