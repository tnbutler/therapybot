import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {FormsModule}    from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';


import {AppComponent}   from './app.component';
import {ChatComponent} from './components/chat-component';
import {EditorComponent} from './components/editor-component';

import {UserMessageDataService} from './service/usermessagedata.service';
import {EditorService} from './service/editor.service';
import './rxjs-operators';


@NgModule({
    imports: [
        AlertModule,
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
    declarations: [AppComponent, ChatComponent, EditorComponent],
    providers: [UserMessageDataService,EditorService],
    bootstrap: [AppComponent]
})

export class AppModule {
}

