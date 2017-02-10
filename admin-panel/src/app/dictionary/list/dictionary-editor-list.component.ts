import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Output, Input,ViewChild } from '@angular/core';
import { EventEmitter, ElementRef } from '@angular/core';

import {DictionaryEditorService}   from "../dictionary-editor.service";
import {BaseList}                from '../../auth/base-list'

@Component({
    selector: 'dictionary-list',

    //styleUrls: [ './chat-version-list.style.scss' ],
    templateUrl: 'dictionary-editor-list.template.html',

    encapsulation: ViewEncapsulation.None,
//  host: {
//    class: 'error-page app'
//  },
})
export class DictionaryEditorList {

    data: any[] = [];
    error: any;
    
    constructor(private dictionaryEditorService: DictionaryEditorService,
                private router: Router) {
    }

    clickItem(item: any): void {
//    console.log('clickItem',item.id);
        //this.onOpenForm.emit(item);
    }

    /*deleteItem(id: any){
        this.baseService.delete(id)
            .subscribe(
                result => {this.getList();
                           this.router.navigate(['../global_variable']);},
                error =>  {this.error = error});
    }*/

    getDictList() {
        this.dictionaryEditorService.getDictList()
            .then(
                dictionaries => {
                    console.log('Received dictionaries: ', dictionaries);
                    this.data = dictionaries;
                },
                error => this.error = <any>error);
    }

    ngOnInit(){
        this.getDictList();
    }
}
