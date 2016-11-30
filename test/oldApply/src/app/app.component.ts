import { Component } from '@angular/core';

import { MessageDataService } from './service/messagedata.service';
import { UserMessageDataService } from './service/usermessagedata.service'
import './rxjs-operators';

@Component({
  selector: 'my-app',
  template: `
  <div #list class="list" [scrollTop]="list.scrollHeight">
  <h1> Chat</h1>
	<router-outlet></router-outlet>
	</div>
  `,
  providers: [MessageDataService,UserMessageDataService]
})
export class AppComponent  { name = 'Angular'; }
