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
  total = 0;
  constructor(private http: ArticleService,
              private fb: FormBuilder,
              private message: NzMessageService
  ) {}

  ngOnInit() {
    // 删除所有超时的数据（超过30分钟的数据）
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.indexOf('tempData_') === 0) {

        const timestamp = key.split('_')[1]
        const diffMinutes = moment().diff(moment(timestamp + ':' + (Number(key.split('_')[2]) - 1 * 5), 'YYYY-MM-DD HH:mm'))
        // 超过24小时的数据清空
        if (diffMinutes > 24 * 60 * 60 * 1000) {
          localStorage.removeItem(key);
        }
      }
    }



    this.tableDataInit();
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      content: null
    });
  }

  tableDataInit(pageNo = 1) {
    // 查
    this.http.getAllArticle({
      pageNo,
      pageSize: 20,
      isShowInvalid: true
    }).subscribe((data: any) => {
      this.listOfData = data.data.list.map((item) => {
        return {
          ...item,
          _created: item.created ? moment(item.created).format('YYYY-MM-DD HH:mm:ss') : '',
          _updated: item.updated ? moment(item.updated).format('YYYY-MM-DD HH:mm:ss') : '',
          _categories: (item.categories || []).map(child => (child.name)).join(',') || '无'
        };
      });

      this.total = data.data.total
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
    this.syncModel('')
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
      this.http.requestSaveArticle(title, content).subscribe(() => {
        this.onResetForm()
        this.isVisible = false;
        this.tableDataInit();
        this.message.create('success', '创建成功');
      });

    } else {
      this.http.requestUpdateArticle(this.rowId, title, content).subscribe(() => {
        this.onResetForm()
        this.isVisible = false;
        this.tableDataInit();
        this.message.create('success', '修改成功');

      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  // 按把一小时按多少分钟，分段计算
  getTimestampStrByMinutes(minutes = 5) {
    // 假如是5分钟一次, 生成的数字1-12
    return String((new Date().getMinutes() / minutes >> 0) + 1)
  }

  // 同步属性内容
  syncModel(str): void {
    // 定时备份
    if (str) {
      const now = moment().format('YYYY-MM-DD HH')
      localStorage.setItem('tempData_' + now + '_' + this.getTimestampStrByMinutes(), str);
    }
    this.markdown = str;
  }

  onUpdateRow(id): void {
    // 临时赋值
    this.rowId = id
    // 查
    this.http.requestGetDetail(id).subscribe((data: any) => {
      const { title, content } = data.data
      this.modalType = 'updated';
      this.isVisible = true;
      this.validateForm.reset({
        title,
        content
      });
      this.syncModel(content)
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
