import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-choose-game-to-play',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './choose-game-to-play.component.html',
  styleUrl: './choose-game-to-play.component.css'
})
export class ChooseGameToPlayComponent {

  playGame(): void {
    console.log('in playGame')
  }
}
