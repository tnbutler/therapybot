import { Component, ViewContainerRef  } from '@angular/core';

import { UserMessageDataService } from './service/usermessagedata.service'
import './rxjs-operators';

@Component({
  selector: 'my-app',
  template: `
  <div #list class="list" [scrollTop]="list.scrollHeight">
	<router-outlet></router-outlet>
	</div>
  `,
  providers: [UserMessageDataService]
})
export class AppComponent  {
  private viewContainerRef: ViewContainerRef;

  public constructor(viewContainerRef:ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }
}
