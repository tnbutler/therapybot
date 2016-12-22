import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {FormsModule}    from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';


import {AppComponent}   from './app.component';
import {MainPageComponent}   from './components/main-page-component';
import {ChatComponent} from './components/chat-component';
import {EditorComponent} from './components/editor-component';
import {ChatPickerComponent} from './components/chat-picker-component'
import {ReportComponent} from './components/report-component'

import {UserMessageDataService} from './service/usermessagedata.service';
import {EditorService} from './service/editor.service';
import {VersionService} from './service/version.service';
import {ReportService} from './service/report.service';
import './rxjs-operators';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/main',
                pathMatch: 'full'
            },
            {
                path: 'main',
                component: MainPageComponent
            },
            {
                path: 'chat',
                component: ChatComponent
            },
            {
                path: 'editor',
                redirectTo: '/main',
                pathMatch: 'full'
            },
            {
                path: 'editor/:id',
                component: EditorComponent
            },
            {
                path: 'chat-picker',
                component: ChatPickerComponent
            },
            {
                path: 'report',
                component: ReportComponent
            }
        ])

    ],
    declarations: [AppComponent, MainPageComponent, ChatComponent, EditorComponent, ChatPickerComponent, ReportComponent],
    providers: [UserMessageDataService, EditorService, VersionService, ReportService],
    bootstrap: [AppComponent]
})

export class AppModule {
}

