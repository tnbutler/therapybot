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

import {QuestionEditorService} from '../../question-editor/question-editor.service'
import {LocalVariableEditorService}   from "../local-variable-editor.service";
import {BaseDetail}  from '../../auth/base-detail';

@Component({
    selector: 'chat-version-detail',

    styleUrls: ['local-variable-editor-detail.style.scss'],
    templateUrl: 'local-variable-editor-detail.template.html',

    encapsulation: ViewEncapsulation.None,
//  host: {
//    class: 'error-page app'
//  },
})
export class LocalVariableEditorDetail extends BaseDetail {

    chaVersion: any;

    constructor(protected route: ActivatedRoute,
                protected variableEditorService: LocalVariableEditorService,
                private _questionEditorService: QuestionEditorService ) {
        super(route, variableEditorService);
        this.chaVersion = this._questionEditorService.version;
    }

    onWriteItem(result){
        result.chat_version_id = this.chaVersion;
    }

}
