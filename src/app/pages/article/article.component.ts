import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import moment from 'moment-es6';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  // 列表数据
  public listOfData = [];
  // 弹框是否显示
  isVisible = false;
  // 弹框loading
  isOkLoading = false;
  validateForm: FormGroup;

  constructor(private http: ArticleService, private fb: FormBuilder) { }

  ngOnInit() {
    this.tableDateInit();
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]]
    });
  }

  tableDateInit() {
    // 查
    this.http.getAllArticle().subscribe((data: any) => {
      console.log('data', data);
      this.listOfData = data.data.map((item) => {
        return {
          ...item,
          _created: item.created ? moment(item.created).format('YYYY-MM-DD HH:mm:ss') : '',
          _updated: item.updated ? moment(item.updated).format('YYYY-MM-DD HH:mm:ss') : ''
        };
      });
    });

  }
  onDetailClick(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(): void {
    console.log(this.validateForm.controls);
    return;
      }
}

