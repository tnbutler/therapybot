 import { NgModule }      from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { RouterModule }   from '@angular/router';
    import { FormsModule }    from '@angular/forms';
    import { HttpModule, JsonpModule } from '@angular/http';



    import { AppComponent }   from './app.component';
    import { ChatComponent } from './components/chat-component';

    import { Message } from './class/message'
    import { MessageDataService } from './service/messagedata.service'
    import { UserMessageDataService } from './service/usermessagedata.service'
    import './rxjs-operators';


    @NgModule({
      imports:      [
      BrowserModule,
      FormsModule,
      HttpModule,
      JsonpModule,
      RouterModule.forRoot([

      {
        path: '',
        redirectTo: '/chat',
        pathMatch: 'full'
      },

      {
        path: 'chat',
        component: ChatComponent
      }


      ])

      ],
      declarations: [ AppComponent, ChatComponent],
      providers: [MessageDataService,UserMessageDataService],
      bootstrap:    [ AppComponent ]
    })

    export class AppModule { }
