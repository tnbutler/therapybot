import { NgModule }      from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from "@angular/forms";
import { RouterModule }   from '@angular/router';
import { ModalModule }  from 'ng2-modal';

import {EhisImgSrcDirective} from '../ehis-directive/ehis-img-src.directive';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        RouterModule,

    ],
    declarations: [
        EhisImgSrcDirective
    ],
    exports: [
        EhisImgSrcDirective
    ],

    providers: [
    ]

})
export class ControlModule {}

