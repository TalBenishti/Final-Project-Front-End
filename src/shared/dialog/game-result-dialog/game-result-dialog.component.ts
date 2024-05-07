import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-game-result-dialog',
  standalone: true,
  templateUrl: './game-result-dialog.component.html',
  styleUrls: ['./game-result-dialog.component.css'],
  imports: [
    MatDialogContent,
    MatDialogActions
  ]
})
export class GameResultDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GameResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; buttonText: string }
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
