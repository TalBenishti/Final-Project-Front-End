// import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ExitGameDialogComponent } from '../../shared/dialog/exit-game-dialog/exit-game-dialog.component';

@Component({
  selector: 'app-exit-game',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './exit-game.component.html',
  styleUrl: './exit-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExitGameComponent {

  constructor(private dialog: MatDialog) { }

  openExitGameDialog(): void {
    this.dialog.open(ExitGameDialogComponent, {
      width: '300px',
      // Add any other dialog configuration options here
    });
  }
}
