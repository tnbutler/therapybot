import { Component,ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,FormArray } from '@angular/forms';
import { ReactiveFormsModule} from "@angular/forms";

import {ChatVersionService} from '../chat-version.service';
import {BaseDetail}         from '../../auth/base-detail';

@Component({
    selector: 'chat-version-detail',
    templateUrl: 'chat-version-detail.template.html',
    styleUrls: [ 'chat-version-detail.style.scss' ],

    encapsulation: ViewEncapsulation.None,
//    providers: [ChartTemplateService],

})
export class ChatVersionDetail extends BaseDetail {

   constructor(protected route: ActivatedRoute,protected baseService:ChatVersionService) {
        super(route,baseService);
    }
}