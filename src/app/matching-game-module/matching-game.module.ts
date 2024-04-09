import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatchingGameComponent } from './matching-game/matching-game.component';
import { WordDisplayComponent } from './word-display/word-display.component';
import { MatchResultDialogComponent } from './match-result-dialog/match-result-dialog.component';
import { ExitGameComponent } from '../exit-game/exit-game.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        MatchResultDialogComponent,
        // ExitGameComponent, 
    ],
    imports: [
        CommonModule,
        MatCardModule
        // RouterModule.forChild([
        //     { path: 'matching/:id', component: MatchingGameComponent },
        //     // Add more routes if needed for navigation
        // ]),
    ],
})
export class MatchingGameModule { }
