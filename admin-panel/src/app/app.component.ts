import { Component } from '@angular/core';

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
export class AppComponent  {  }
