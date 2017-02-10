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

import {QuestionEditorService} from "./question-editor.service";
import {QuestionEditorComponent} from "./list/question-editor.component"
import {QuestionDetailComponent} from './detail/question-editor-detail.component'
import { Ng2UploaderModule } from 'ng2-uploader';
import {RulesEditorComponent} from '../rules-editor/list/rules-editor.component'

import {ControlModule} from '../control/control.module'

export {QuestionEditorComponent};

//////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2UploaderModule,
        RouterModule,
        ControlModule,

//        ModalModule,
        PaginationModule.forRoot(),
//        ButtonsModule,

//        EhisControlModule,

//        Ng2UploaderModule
    ],
    declarations: [
        QuestionEditorComponent,
        QuestionDetailComponent,
        RulesEditorComponent
    ],
    exports: [
    ],

    providers: [
        QuestionEditorService
    ]

})
export class QuestionEditorModule {}

/**
 * Created by Dmitry1 on 02.02.2017.
 */
