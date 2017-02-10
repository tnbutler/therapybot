import { Component, ViewEncapsulation } from '@angular/core';

import {QuestionEditorService} from '../../question-editor/question-editor.service'
import {LocalVariableEditorService}   from "../local-variable-editor.service";
import {BaseList}                from '../../auth/base-list'

@Component({
    selector: 'chat-version-list',

    //styleUrls: [ './chat-version-list.style.scss' ],
    templateUrl: 'local-variable-editor-list.template.html',

    encapsulation: ViewEncapsulation.None,
//  host: {
//    class: 'error-page app'
//  },
})
export class LocalVariableEditorList extends BaseList {

    chatVersion: any;
    error: any;

    constructor(private variableEditorService: LocalVariableEditorService,
                private questionEditorService: QuestionEditorService) {
        super(variableEditorService);
        this.chatVersion = this.questionEditorService.version;
        this.paramItems.chat_version_id = this.chatVersion;
    }



    clickItem(item: any): void {
//    console.log('clickItem',item.id);
        //this.onOpenForm.emit(item);
    }

    deleteItem(id: any){
        this.baseService.delete(id)
            .subscribe(
                result => {this.getList()},
                error =>  {this.error = error});
    }
}
