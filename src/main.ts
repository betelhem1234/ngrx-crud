import 'zone.js'; 
import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { App } from './app/app';
import { articleReducer } from './app/state/articles.reducer';
import { ArticlesEffects } from './app/state/articles.effects';

bootstrapApplication(App, {
  providers: [
    provideStore({ articles: articleReducer }),
    provideEffects([ArticlesEffects])
  ]
});
