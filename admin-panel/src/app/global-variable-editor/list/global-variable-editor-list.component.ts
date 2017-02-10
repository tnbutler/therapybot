import { Component, ViewEncapsulation } from '@angular/core';

import {GlobalVariableEditorService}   from "../global-variable-editor.service";
import {BaseList}                from '../../auth/base-list'

@Component({
    selector: 'chat-version-list',

    //styleUrls: [ './chat-version-list.style.scss' ],
    templateUrl: 'global-variable-editor-list.template.html',

    encapsulation: ViewEncapsulation.None,
//  host: {
//    class: 'error-page app'
//  },
})
export class GlobalVariableEditorList extends BaseList {

    error: any;
    
    constructor(private variableEditorService: GlobalVariableEditorService) {
        super(variableEditorService);
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
