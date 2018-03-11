import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app/app.component';

import { LogComponent} from '../../log/log.component';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getBlurState()
  {
    return LogComponent.blur;
  }

}
