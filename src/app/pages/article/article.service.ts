import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
const baseUrl = window.location.host.includes('localhost') ? '/local': ''
@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}
  getAllArticle() {
    return this.http.get(baseUrl + '/api/article/all');
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
      baseUrl + '/api/article/update', {
        _id: id,
        title,
        content
      }
    );
  }
  requestDeleteArticle(id: string) {
    return this.http.post(
      baseUrl + '/api/article/delete', {
        _id: id
      }
    );
  }
}
