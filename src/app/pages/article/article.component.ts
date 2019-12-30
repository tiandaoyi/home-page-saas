import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  ArticleService
} from './article.service';
import moment from 'moment-es6';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  NzMessageService
} from 'ng-zorro-antd/message';
import {
  EditorConfig
} from '../../common/model/editor-config';

export type ModalType = 'created' | 'updated';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {
  // 列表数据
  public listOfData = [];
  // 弹框是否显示
  isVisible = false;
  // 弹框loading
  isOkLoading = false;
  validateForm: FormGroup;

  markdown = '';
  modalType: ModalType = 'created';
  rowId: string;
  conf = new EditorConfig();
  constructor(private http: ArticleService,
              private fb: FormBuilder,
              private message: NzMessageService
  ) {}

  ngOnInit() {
    this.tableDataInit();
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      content: null
    });
  }

  tableDataInit() {
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

  onDetailClick(type: ModalType): void {
    if (type === 'created') {
      this.modalType = 'created';
      this.onResetForm();
    }
    this.isVisible = true;
  }

  onResetForm() {
    this.markdown = '';
    this.validateForm.reset({
      title: '',
      content: ''
    });
  }

  handleOk(): void {
    const {
      title
    } = this.validateForm.value;
    const content = this.markdown;
    console.log(content);
    if (this.modalType === 'created') {
      this.http.requestSaveArticle(title, content).subscribe(data => {
        this.isVisible = false;
        this.tableDataInit();
        this.message.create('success', '创建成功');
      });

    } else {
      this.http.requestUpdateArticle(this.rowId, title, content).subscribe(data => {
        this.isVisible = false;
        this.tableDataInit();
        this.message.create('success', '  修改成功');
      });

    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  // 同步属性内容
  syncModel(str): void {
    this.markdown = str;
  }

  onUpdateRow({
    title,
    content,
    _id
  }): void {
    // 页面保存状态
    this.rowId = _id;
    this.modalType = 'updated';
    this.isVisible = true;
    this.markdown = content;
    this.validateForm.reset({
      title,
      content
    });
  }

  onDeleteRow(id: string): void {
    this.http.requestDeleteArticle(id).subscribe(() => {
      console.log('删除成功');
      this.message.create('success', '删除成功');
      this.tableDataInit();
    });
  }
}
