import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { GamePlayed } from '../../shared/model/GamePlayed';
import { CategoriesService } from '../services/categories.service';
import { GamesPlayedService } from '../services/gamesPlayed.service';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    MatCardModule,
    CommonModule
  ],
})
export class DashboardComponent implements OnInit {
  gameData: GamePlayed[] = [];
  totalPoints: number = 0;
  totalGamesPlayed: number = 0;
  totalCategoriesLearned: number = 0;
  totalCategoriesNotLearned: number = 0;
  totalCategories: number = 0;
  averageGameDuration: number = 0;
  totalPlayTime: number = 0;
  percentageGamesEndedOnTime: number = 0;

  constructor(private categoriesService: CategoriesService, private gamesPlayedService: GamesPlayedService) { }

  ngOnInit(): void {
    this.gamesPlayedService.list()
      .then((gameResults: GamePlayed[]) => {
        this.gameData = gameResults;
        return this.categoriesService.list();
      })
      .then((categoryResults: Category[]) => {
        this.totalCategories = categoryResults.length;
        this.calculateTotals();
      })
      .catch(error => {
        console.error('Error loading game or category data', error);
      });
  }


calculateTotals(): void {
  this.totalGamesPlayed = this.gameData.length;
  this.totalPoints = this.gameData.reduce((total, game) => total + game.points, 0);
  this.totalCategoriesLearned = new Set(this.gameData.map(game => game.categoryId)).size;
  this.totalCategoriesNotLearned = this.totalCategories - this.totalCategoriesLearned;
  this.totalPlayTime = this.gameData.reduce((total, game) => total + game.secondsPlayed, 0);
  this.averageGameDuration = this.totalPlayTime / this.totalGamesPlayed;

  const gamesEndedOnTime = this.gameData.filter(game => game.secondsLeftInGame > 0).length;
  this.percentageGamesEndedOnTime = (gamesEndedOnTime / this.totalGamesPlayed) * 100;

}
}
