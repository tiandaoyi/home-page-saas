import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public listOfData = [{
    id: 1,
    title: 'HTTP/3 的过去、现在和未来',
    category: '网络',
    createTime: '2019-11-02',
    updateTime: '2019-11-02'
  }];

  constructor(private http: ArticleService) { }

  ngOnInit() {
    // http request
    this.tableDateInit();
  }

  tableDateInit() {
    this.http.getAllArticle().subscribe((data: any) => {
      console.log('data', data);
    });

  }

}
