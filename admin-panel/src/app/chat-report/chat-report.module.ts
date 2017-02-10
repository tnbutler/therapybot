import { NgModule }      from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from "@angular/forms";
import { RouterModule }   from '@angular/router';

import { PaginationModule }          from 'ng2-bootstrap';
import {EhisImgSrcDirective} from '../ehis-directive/ehis-img-src.directive';


/////////////////////////////////////////////////////////////////////////////////////////////

import {ChatReportService} from "./chat-report.service";
import {ChatReportComponent}    from "./list/chat-report.component";
import {KeysPipe} from './chat-report.pipe'


export {ChatReportComponent};


//////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

//        ModalModule,
        PaginationModule.forRoot(),
//        ButtonsModule,

//        EhisControlModule,

//        Ng2UploaderModule
    ],
    declarations: [
        ChatReportComponent,
        KeysPipe
    ],
    exports: [
    ],

    providers: [
        ChatReportService
    ]

})
export class ChatReportModule {}

/**
 * Created by Dmitry1 on 02.02.2017.
 */
