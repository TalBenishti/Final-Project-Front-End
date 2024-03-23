import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../shared/model/category';
import { GameCategoryCardComponent } from "../gameCategoryCard/gameCategoryCard.component";

@Component({
    selector: 'app--game-categories',
    standalone: true,
    templateUrl: './ gameCategories.component.html',
    styleUrl: './ gameCategories.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        GameCategoryCardComponent
    ]
})
export class GameCategoriesComponent implements OnInit {
  allGameCategories: Category[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.allGameCategories = this.categoriesService.list()
    console.log('this.allGameCategories', this.allGameCategories);
  }
}
