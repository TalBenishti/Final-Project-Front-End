import { Component, OnInit } from '@angular/core';
import { GamePlayed } from '../services/gamesPoints.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    MatCardModule
  ]
})
export class DashboardComponent implements OnInit {
  gameData: GamePlayed[] = [];
  totalPoints: number = 0;
  totalGamesPlayed: number = 0;
  totalCategoriesLearned: number = 0;
  totalCategoriesNotLearned: number = 0;
  totalCategories: number = 0;

  ngOnInit(): void {
    const localStorageGamesData = localStorage.getItem('littleLinguistData');
    const localStorageCategoriesData = localStorage.getItem('categories');
    if (localStorageCategoriesData) {
      const tempData = JSON.parse(localStorageCategoriesData);
      this.totalCategories = tempData.length;
    }
    if (localStorageGamesData) {
      this.gameData = JSON.parse(localStorageGamesData);
      this.calculateTotals();
    }
  }

  calculateTotals(): void {
    this.totalGamesPlayed = this.gameData.length;
    this.totalPoints = this.gameData.reduce((total, game) => total + game.points, 0);
    this.totalCategoriesLearned = new Set(this.gameData.map(game => game.categoryId)).size;
    this.totalCategoriesNotLearned = this.totalCategories - this.totalCategoriesLearned;
  }
}
