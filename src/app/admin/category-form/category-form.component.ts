import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Language } from '../../../shared/model/language';
import { Category } from '../../../shared/model/category';
import { FormsModule, NgModelGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslatedWord } from '../../../shared/model/translated-word';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent implements OnInit {
  currentCategory = new Category("", "", Language.English, Language.Hebrew, new Date());
  displayedColumns: string[] = ["Origin", "Target", "Actions"];

  @Input()
  id?: string;

  @ViewChild('wordsGroup') wordsGroup?: NgModelGroup;

  constructor(private categoriesService: CategoriesService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.id) {
      this.categoriesService.get(this.id).then(
        (categoryFromService) => {
          if (categoryFromService) {
            this.currentCategory = categoryFromService;
          }
        }
      );
    }
  }

  addWord() {
    this.currentCategory.words =
      [...this.currentCategory.words,
      new TranslatedWord("", "")];
  }

  deleteWord(pairTodelete: TranslatedWord) {
    let extendedWordsList = this.currentCategory.words;
    this.currentCategory.words = extendedWordsList.filter(obj => pairTodelete !== obj);
    this.wordsGroup!.control.markAsDirty();
  }

  saveCategory() {
    this.currentCategory.lastUpdateDate = new Date();
    if (this.id) {
      this.categoriesService.update(this.currentCategory).then(
        () => this.router.navigate([''])
      );
    } else {
      this.categoriesService.add(this.currentCategory).then(
        () => this.router.navigate([''])
      );
    }
  }
}
