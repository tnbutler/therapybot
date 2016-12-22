import { Component } from '@angular/core';

import { UserMessageDataService } from './service/usermessagedata.service'
import './rxjs-operators';

@Component({
  selector: 'my-app',
  template: `

	<router-outlet></router-outlet>
  `,
  providers: [UserMessageDataService]
})
export class AppComponent  {
}
