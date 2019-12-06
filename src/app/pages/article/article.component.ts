import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import moment from 'moment-es6';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditorConfig } from '../../common/model/editor-config';
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

  markdown = '测试语句';
  conf = new EditorConfig();
  constructor(private http: ArticleService, private fb: FormBuilder) { }

  ngOnInit() {
    this.tableDateInit();
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
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
    console.log('49', this.validateForm);
    const { title, content } = this.validateForm.value;
    this.http.requestSaveArticle(title, content).subscribe(data => {
      console.log(data);
      this.isVisible = false;
    });
  }

  handleCancel(): void {
    console.log('60');
    this.isVisible = false;
  }

  // 同步属性内容
  syncModel(str): void {
    console.log('66', str);
    this.markdown = str;
  }

}

