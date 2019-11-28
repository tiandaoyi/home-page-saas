import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}
  getAllArticle() {
    return this.http.get('localhost:3001/api/article/all');
  }
}

