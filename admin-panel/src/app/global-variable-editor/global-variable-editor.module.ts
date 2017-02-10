import { NgModule }      from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from "@angular/forms";
import { RouterModule }   from '@angular/router';

import { PaginationModule }          from 'ng2-bootstrap';
import {EhisImgSrcDirective} from '../ehis-directive/ehis-img-src.directive';


/////////////////////////////////////////////////////////////////////////////////////////////

import {GlobalVariableEditorService} from "./global-variable-editor.service";
import {GlobalVariableEditorList}    from "./list/global-variable-editor-list.component";
import {GlobalVariableEditorDetail}    from "./detail/global-variable-editor-detail.component";

export {GlobalVariableEditorList,GlobalVariableEditorDetail};


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
        GlobalVariableEditorList,
        GlobalVariableEditorDetail,
    ],
    exports: [
    ],

    providers: [
        GlobalVariableEditorService
    ]

})
export class GlobalVariableEditorModule {}

