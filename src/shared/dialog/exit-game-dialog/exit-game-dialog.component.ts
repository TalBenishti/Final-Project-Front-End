import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exit-game-dialog',
  templateUrl: './exit-game-dialog.component.html',
  styleUrls: ['./exit-game-dialog.component.css'],
})
export class ExitGameDialogComponent {
  constructor(private dialogRef: MatDialogRef<ExitGameDialogComponent>,
    private router: Router) { }

  confirmExit(): void {
    this.router.navigateByUrl('/lets-play'); 
    this.dialogRef.close(); 
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
