import { NgModule }      from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from "@angular/forms";
import { RouterModule }   from '@angular/router';

import { PaginationModule }          from 'ng2-bootstrap';
import {EhisImgSrcDirective} from '../ehis-directive/ehis-img-src.directive';


/////////////////////////////////////////////////////////////////////////////////////////////

import {DictionaryEditorService} from "./dictionary-editor.service";
import {DictionaryEditorList}    from "./list/dictionary-editor-list.component";
//import {GlobalVariableEditorDetail}    from "./detail/global-variable-editor-detail.component";

export {DictionaryEditorList};


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
        DictionaryEditorList
    ],
    exports: [
    ],

    providers: [
        DictionaryEditorService
    ]

})
export class DictionaryEditorModule {}

