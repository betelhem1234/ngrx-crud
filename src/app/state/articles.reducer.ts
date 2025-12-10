import { createReducer, on } from '@ngrx/store';
import { Article } from '../models/article.model';
import {
  addArticle, addArticleSuccess, addArticleFailure,
  updateArticle, updateArticleSuccess, updateArticleFailure,
  deleteArticle, deleteArticleSuccess, deleteArticleFailure
} from './articles.actions';

export interface ArticleState {
  articles: Article[];
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage?: string | null;
}

export const initialState: ArticleState = {
  articles: [
    {
      id: '1',
      title: 'Angular State Management with NgRx',
      author: 'Betelem Lemma',
      publisher: 'Bety'
    }
  ],
  status: 'idle',
  errorMessage: null
};

export const articleReducer = createReducer(
  initialState,
  on(addArticle, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(addArticleSuccess, (state, { article }) => ({
    ...state,
    articles: [...state.articles, article],
    status: 'success'
  })),
  on(addArticleFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    errorMessage: error
  })),
  on(updateArticle, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(updateArticleSuccess, (state, { article }) => ({
    ...state,
    status: 'success',
    articles: state.articles.map(a => 
      a.id === article.id ? article : a
    )
  })),
  on(updateArticleFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    errorMessage: error
  })),
  on(deleteArticle, (state) => ({
    ...state,
    status: 'loading'
  })),

  on(deleteArticleSuccess, (state, { id }) => ({
    ...state,
    articles: state.articles.filter(a => a.id !== id),
    status: 'success'
  })),

  on(deleteArticleFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    errorMessage: error
  }))
);
