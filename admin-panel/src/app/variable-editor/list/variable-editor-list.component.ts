import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Output, Input,ViewChild } from '@angular/core';
import { EventEmitter, ElementRef } from '@angular/core';

import {VariableEditorService}   from "../variable-editor.service";
import {BaseList}                from '../../auth/base-list'

@Component({
    selector: 'chat-version-list',

    //styleUrls: [ './chat-version-list.style.scss' ],
    templateUrl: 'variable-editor-list.template.html',

    encapsulation: ViewEncapsulation.None,
//  host: {
//    class: 'error-page app'
//  },
})
export class VariableEditorList extends BaseList {
    
    constructor(private variableEditorService: VariableEditorService) {
        super(variableEditorService);
    }

    clickItem(item: any): void {
//    console.log('clickItem',item.id);
        //this.onOpenForm.emit(item);
    }
}
