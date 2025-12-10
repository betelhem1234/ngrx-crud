import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

import { Article } from './models/article.model';
import { AppState } from './models/state.model';
import { addArticle, updateArticle, deleteArticle } from './state/articles.actions';
import { selectAllArticles } from './state/articles.selectors';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    CommonModule,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
     MatTableModule,
    ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  articles$!: Observable<Article[]>;
  articleForm!: FormGroup;
  displayedColumns: string[] = ['title', 'author', 'publisher','actions' ];
  dataSource = new MatTableDataSource<Article>();
  editMode = false;
  editId: string | null = null;
  selectedArticle: Article | null = null;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.articles$ = this.store.select(selectAllArticles);
    
    this.articleForm = this.fb.group({
      id: ['', ],
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['',Validators.required],
    });
    this.articles$ = this.store.select(selectAllArticles);
    this.articles$.subscribe(articles => {
        this.dataSource.data = articles ?? [];
      });
  }

  submitArticle() {
    const data = this.articleForm.value;

    if (this.editMode) {
      this.store.dispatch(updateArticle({ article: { id: this.editId!, ...data } }));
      this.editMode = false;
      this.editId = null;
    } else {
      this.store.dispatch(addArticle({ article: data }));
    }
    this.articleForm.reset();
  }

  onEdit(article?: Article) {
    if (!article) {
      return
    }
    this.articleForm.patchValue(article);
    this.editMode = true;
    this.editId = article.id;
  }

  onDelete(id: string) {
      if (!id) {
      return
    }
    this.store.dispatch(deleteArticle({ id }));
  }
}
