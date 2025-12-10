import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState } from './articles.reducer';

export const selectArticlesState =
  createFeatureSelector<ArticleState>('articles');

export const selectAllArticles = createSelector(
  selectArticlesState,
  (state) => state.articles
);
