import { Component, OnInit, Input } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  mode = false;
  dark = false;
  @Input() isCollapsed: boolean;
  constructor() { }

  ngOnInit() {
  }

}
