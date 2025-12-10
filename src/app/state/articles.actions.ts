import { createAction, props } from '@ngrx/store';
import { Article } from '../models/article.model';

export const addArticle = createAction('[ARTICLE] Add Article',props<{ article: Article }>());
export const addArticleSuccess = createAction('[ARTICLE] Add Article Success',props<{ article: Article }>());
export const addArticleFailure = createAction('[ARTICLE] Add Article Failure',props<{ error: any }>());

export const updateArticle = createAction('[Article] Update',props<{ article: Article }>());
export const updateArticleSuccess = createAction('[ARTICLE] Update Article Success',props<{ article: Article }>());
export const updateArticleFailure = createAction('[ARTICLE] Update Article Failure',props<{ error: any }>());

export const deleteArticle = createAction('[Article] Delete',props<{ id: string }>());
export const deleteArticleSuccess = createAction('[ARTICLE] Delete Article Success',props<{ id: string }>());
export const deleteArticleFailure = createAction('[ARTICLE] Delete Article Failure',props<{ error: any }>());
