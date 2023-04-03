import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
const baseUrl = window.location.host.includes('localhost') ? '/local': ''

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}
  getAllCategory(params) {
    return this.http.post(
      baseUrl + '/api/category/all', {
        ...params
      }
    );
  }
  requestSaveCategory(title: string, content: string) {
    return this.http.post(
      '/api/category/create', {
        title,
        content
      });
  }
  requestUpdateCategory(id: string, title: string, content: string) {
    return this.http.post(
      baseUrl + '/api/category/update', {
        _id: id,
        title,
        content
      }
    );
  }
  requestDeleteCategory(id: string) {
    return this.http.post(
      baseUrl + '/api/category/delete', {
        _id: id
      }
    );
  }

  requestGetDetail(_id: string) {
    return this.http.post(
      baseUrl + '/api/category/getDetail', {
        _id
      }
    )
  }
}
