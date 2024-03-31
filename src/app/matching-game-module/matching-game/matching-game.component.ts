import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ExitGameComponent } from '../../exit-game/exit-game.component';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../shared/model/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matching-game',
  standalone: true,
  imports: [
    CommonModule,
    ExitGameComponent,
  ],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchingGameComponent implements OnInit {
  @Input() categoryId: string = '';
  gameWordList: Category | undefined;

  constructor(private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    console.log('categoryId', this.categoryId)

    console.log(this.categoriesService.get(Number(this.categoryId)))
    this.gameWordList = this.categoriesService.get(Number(this.categoryId))
  }


navigateToLetsPlay(): void {
    console.log('Navigating to lets-play');
    this.router.navigate(['/lets-play']);
}
}
