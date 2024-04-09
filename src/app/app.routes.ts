import { Routes } from '@angular/router';
import { CategoriesListComponent } from './admin/categories-list/categories-list.component';
import { CategoryFormComponent } from './admin/category-form/category-form.component';
import { GameCategoriesComponent } from './Category_selection/ gameCategories/ gameCategories.component';
import { MatchingGameComponent } from './matching-game-module/matching-game/matching-game.component';
import { HelpGamesComponent } from './help-games/help-games.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "admin", component: CategoriesListComponent },
    { path: "category/:id", component: CategoryFormComponent },
    { path: "newcategory", component: CategoryFormComponent },
    { path: "lets-play", component: GameCategoriesComponent },
    { path: "matching/:categoryId", component: MatchingGameComponent },
    { path: "help-games", component: HelpGamesComponent },
    
];
