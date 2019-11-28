import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

// 菜单栏
import { MenuComponent } from './part/menu/menu.component';
import { ArticleComponent } from './pages/article/article.component';
import { CategoryComponent } from './pages/category/category.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

// service
import { ArticleService } from './pages/article/article.service';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ArticleComponent,
    CategoryComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  bootstrap: [AppComponent],
  providers: [ArticleService]
})
export class AppModule { }
