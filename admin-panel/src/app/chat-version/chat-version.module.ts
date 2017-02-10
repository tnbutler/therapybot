import { NgModule }      from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from "@angular/forms";
import { RouterModule }   from '@angular/router';
import { ModalModule }  from 'ng2-modal';


//import { ModalModule }             from 'ng2-modal';

import { PaginationModule }          from 'ng2-bootstrap';

//import { ButtonsModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';

//import {EhisControlModule} from "../ehis-control/ehis-control.module";

/////////////////////////////////////////////////////////////////////////////////////////////

import {ChatVersionService} from "./chat-version.service";
import {ChatVersionList}    from "./list/chat-version-list.component";
import {ChatVersionDetail}  from "./detail/chat-version-detail.component";
import { Ng2UploaderModule } from 'ng2-uploader';
import {ControlModule} from '../control/control.module'

export {ChatVersionList,ChatVersionDetail};

//////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2UploaderModule,
        ModalModule,
        RouterModule,
        ControlModule,
 
//        ModalModule,
        PaginationModule.forRoot(),
//        ButtonsModule,

//        EhisControlModule,

//        Ng2UploaderModule
    ],
    declarations: [
        ChatVersionList,
        ChatVersionDetail,
       // EhisImgSrcDirective
    ],
    exports: [
    ],

    providers: [
      ChatVersionService
    ]

})
export class ChatVersionModule {}

