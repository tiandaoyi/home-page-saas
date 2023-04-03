import {
  BrowserModule
} from '@angular/platform-browser';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  NgModule
} from '@angular/core';
import {
  FormsModule
} from '@angular/forms';
// markdown
// import {
//   MarkdownModule,
//   MarkedOptions
// } from 'ngx-markdown';
import { EditorMdDirective } from './common/editor-md.directive';

import {
  HttpClientModule
} from '@angular/common/http';
import {
  NgZorroAntdModule,
  // NZ_I18N,
  // zh_CN
} from 'ng-zorro-antd';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';

import {
  registerLocaleData
} from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

// 菜单栏
import {
  MenuComponent
} from './part/menu/menu.component';
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
import {
  ReactiveFormsModule
} from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

// service
import {
  ArticleService
} from './pages/article/article.service';
import {
  CategoryService
} from './pages/category/category.service';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ArticleComponent,
    CategoryComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    EditorMdDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    NzPopconfirmModule,
    //    MarkdownModule.forRoot({
    //      markedOptions: {
    //        provide: MarkedOptions,
    //        useValue: {
    //          gfm: true,
    //          tables: true,
    //          breaks: false,
    //          pedantic: false,
    //          sanitize: false,
    //          smartLists: true,
    //          smartypants: false
    //        }
    //      }
    //    })
  ],
  bootstrap: [AppComponent],
  providers: [ArticleService, CategoryService]
})
export class AppModule {}
