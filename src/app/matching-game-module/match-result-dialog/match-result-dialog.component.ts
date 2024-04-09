import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-match-result-dialog',
  templateUrl: './match-result-dialog.component.html',
  styleUrls: ['./match-result-dialog.component.css'],
})
export class MatchResultDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MatchResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; buttonText: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
