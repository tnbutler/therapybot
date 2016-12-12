 import { NgModule }      from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { RouterModule }   from '@angular/router';
    import { FormsModule }    from '@angular/forms';
    import { HttpModule, JsonpModule } from '@angular/http';



    import { AppComponent }   from './app.component';
    import { ChatComponent } from './components/chat-component';
    import { EditorComponent} from './components/editor-component'

    import { Message } from './class/message'
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
      },
          {
              path: 'editor',
              component: EditorComponent
          }


      ])

      ],
      declarations: [ AppComponent, ChatComponent, EditorComponent],
      providers: [UserMessageDataService],
      bootstrap:    [ AppComponent ]
    })

    export class AppModule { }

