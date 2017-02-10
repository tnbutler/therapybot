import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Output, Input,ViewChild } from '@angular/core';
import { EventEmitter, ElementRef } from '@angular/core';

import {ChatVersionService}   from "../chat-version.service";
import {BaseList}                from '../../auth/base-list'
import {QuestionEditorService} from '../../question-editor/question-editor.service'

@Component({
    selector: 'chat-version-list',

    //styleUrls: [ './chat-version-list.style.scss' ],
    templateUrl: 'chat-version-list.template.html',

    encapsulation: ViewEncapsulation.None,
//  host: {
//    class: 'error-page app'
//  },
})
export class ChatVersionList extends BaseList {

    error: any = '';

    constructor(private chatVersionService: ChatVersionService,
                private questionEditorService: QuestionEditorService) {
        super(chatVersionService);
    }

    clickItem(item: any): void {
//    console.log('clickItem',item.id);
        //this.onOpenForm.emit(item);
    }

    selectChat(name){
        console.log(name);
        this.questionEditorService.selectedChat = name;
    }

    selectedColor(state: boolean) {
        if (state == true) {
            return '#b8f3b8'; //"CBF08B";
        }
    }


    @ViewChild('chat_info') chatInfo;

    userClick($event,item) {
        $event.stopPropagation();
        this.chatInfo.open(item.id);
        console.log('Clicked', item.id)
    }

    onUserPersonalMessages(user) {
        console.log('onUser');
        //this.baseService.authService.routeData = user.item;
        this.baseService.authService.navigate(['/chat_version/',{id: user.id}],user);
        //console.log(user.item);
        //this.runChat(user.item);
    }

    addChat(){
        this.baseService.getItem(0,null)
            .subscribe(
                result => {this.getList()},
                error =>  {this.error = error});
    }

    deleteItem(id: any){
        this.baseService.delete(id)
            .subscribe(
                result => {this.getList()},
                error =>  {this.error = error});
    }

    copy(id) {
        this.baseService.authService.copy('https://api.therapybot.io/admin/versions/copy/',id)
            .subscribe(
                result => {this.getList()},
                error =>  {this.error = error});
    }
}
