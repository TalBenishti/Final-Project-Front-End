import { Routes } from '@angular/router';
import { CategoriesListComponent } from './admin/categories-list/categories-list.component'; 
import { CategoryFormComponent } from './admin/category-form/category-form.component'; 
import { GameCategoriesComponent } from './Category_selection/ gameCategories/ gameCategories.component';
import { MatchingGameMainComponent } from './matching-game-main/matching-game-main.component';

export const routes: Routes = [
    {path: "", component: CategoriesListComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "lets-play", component: GameCategoriesComponent},
    {path:"matching/:id", component:MatchingGameMainComponent}
];
