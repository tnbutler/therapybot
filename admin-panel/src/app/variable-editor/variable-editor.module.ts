import { NgModule }      from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from "@angular/forms";
import { RouterModule }   from '@angular/router';

import { PaginationModule }          from 'ng2-bootstrap';
import {EhisImgSrcDirective} from '../ehis-directive/ehis-img-src.directive';


/////////////////////////////////////////////////////////////////////////////////////////////

import {VariableEditorService} from "./variable-editor.service";
import {VariableEditorList}    from "./list/variable-editor-list.component";
import {VariableEditorDetail}    from "./detail/variable-editor-detail.component";

export {VariableEditorList};


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
        VariableEditorList,
        VariableEditorDetail,
    ],
    exports: [
    ],

    providers: [
        VariableEditorService
    ]

})
export class VariableEditorModule {}

