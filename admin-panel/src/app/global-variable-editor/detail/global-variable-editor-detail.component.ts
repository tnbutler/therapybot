import {
    Component,
    ViewEncapsulation,
    ViewChild,
    Output,
    EventEmitter
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, FormArray} from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";

import {NgZone} from '@angular/core';

import {GlobalVariableEditorService}   from "../global-variable-editor.service";
import {BaseDetail}  from '../../auth/base-detail';

@Component({
    selector: 'chat-version-detail',

    styleUrls: ['global-variable-editor-detail.style.scss'],
    templateUrl: 'global-variable-editor-detail.template.html',

    encapsulation: ViewEncapsulation.None,
//  host: {
//    class: 'error-page app'
//  },
})
export class GlobalVariableEditorDetail extends BaseDetail {

    constructor(protected route: ActivatedRoute, protected variableEditorService: GlobalVariableEditorService) {
        super(route, variableEditorService);
    }

}
