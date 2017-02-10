import { NgModule }      from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from "@angular/forms";
import { RouterModule }   from '@angular/router';

import { PaginationModule }          from 'ng2-bootstrap';
import {EhisImgSrcDirective} from '../ehis-directive/ehis-img-src.directive';


/////////////////////////////////////////////////////////////////////////////////////////////

import {LocalVariableEditorService} from "./local-variable-editor.service";
import {LocalVariableEditorList}    from "./list/local-variable-editor-list.component";
import {LocalVariableEditorDetail}    from "./detail/local-variable-editor-detail.component";

export {LocalVariableEditorList,LocalVariableEditorDetail};


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
        LocalVariableEditorList,
        LocalVariableEditorDetail,
    ],
    exports: [
    ],

    providers: [
        LocalVariableEditorService
    ]

})
export class LocalVariableEditorModule {}

