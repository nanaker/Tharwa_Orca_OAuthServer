import { Component, OnInit } from '@angular/core';
import { AppComponent} from '../../app/app.component';

import { LogComponent} from '../../log/log.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  selectedItem : number = 1;
  ngOnInit() 
  {
    this.selectedItem = 1 ;
  }

  getBlurState()
  {
    if (localStorage.getItem('blur')==='true'){
      
      alert(localStorage.getItem('blur'));
      return true;

    }else
    {
      return false;
    }
  }

}
