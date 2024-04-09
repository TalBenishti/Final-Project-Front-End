import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category } from '../../../shared/model/category';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ChooseGameToPlayComponent } from '../../../shared/dialog/choose-game-to-play/choose-game-to-play.component';

@Component({
  selector: 'app-game-category-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ChooseGameToPlayComponent
  ],
  templateUrl: './gameCategoryCard.component.html',
  styleUrl: './gameCategoryCard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCategoryCardComponent { 

  @Input()
   currentGameCategory? : Category;

   constructor(private dialog: MatDialog) {}


   openChooseGameDialog(): void {
    const dialogRef = this.dialog.open(ChooseGameToPlayComponent, {
      width: '400px', 
      data: this.currentGameCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
