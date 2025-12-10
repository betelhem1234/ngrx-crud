import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  addArticle, addArticleSuccess, addArticleFailure,
  updateArticle, updateArticleSuccess, updateArticleFailure,
  deleteArticle, deleteArticleSuccess, deleteArticleFailure
} from './articles.actions';

import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Article } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class ArticlesEffects {
  private actions$ = inject(Actions);

addArticle$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addArticle),
    mergeMap(action =>
      of(action.article).pipe(
        map((article: Article) => addArticleSuccess({ article })),

        tap(() => {
          window.alert("Successfully added");
        }),

        catchError(error => {
          window.alert("Failed to add article!");

          return of(addArticleFailure({ error }));
        })
      )
    )
  )
);


  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticle),
      mergeMap(action =>
        of(action.article).pipe(
          map((article: Article) => updateArticleSuccess({ article })),
          tap(() => {
          window.alert("Successfully edited");
        }),
          catchError(error => {
             window.alert("Failed to edit article!");
             return of(updateArticleFailure({ error }));
            })
        )
      )
    )
  );

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArticle),
      mergeMap(action =>
        of(action.id).pipe(
          map((id: string) => deleteArticleSuccess({ id })),
          tap(() => {
          window.alert("Successfully deleted");
        }),
          catchError(error =>{
              window.alert("Failed to edit article!");
          return of(deleteArticleFailure({ error }));
        })
        )
      )
    )
  );
}
