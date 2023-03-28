import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import {
  ArticleComponent
} from './pages/article/article.component';
import {
  CategoryComponent
} from './pages/category/category.component';
import {
  WelcomeComponent
} from './pages/welcome/welcome.component';
import {
  PageNotFoundComponent
} from './pages/page-not-found/page-not-found.component';


const routes: Routes = [{
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }, {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'article',
    component: ArticleComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  }, {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full',
  }
];

@NgModule({
  providers: [{ provide: APP_BASE_HREF, useValue: '/saas/' }],
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
