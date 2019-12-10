import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}
  getAllArticle() {
    return this.http.get('/api/article/all');
  }
  requestSaveArticle(title: string, content: string) {
    return this.http.post(
      '/api/article/create', {
        title,
        content
      });
  }
  requestUpdateArticle(id: string, title: string, content: string) {
    return this.http.post(
      '/api/article/update', {
        _id: id,
        title,
        content
      }
    );
  }
  requestDeleteArticle(id: string) {
    return this.http.post(
      '/api/article/delete', {
        _id: id
      }
    );
  }
}
