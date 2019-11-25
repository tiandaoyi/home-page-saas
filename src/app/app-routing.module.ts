import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleComponent } from './pages/article/article.component';
import { CategoryComponent } from './pages/category/category.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'welcome', component: WelcomeComponent
  },
  {
    path: 'article', component: ArticleComponent
  },
  {
    path: 'category', component: CategoryComponent
  }, {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }, {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
