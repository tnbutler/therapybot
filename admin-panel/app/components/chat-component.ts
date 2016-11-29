import {Component, OnInit} from '@angular/core';
import {Message} from '../class/message';
import {UserMessage} from '../class/userMessage';
import {MessageDataService} from '../service/messagedata.service'
import {UserMessageDataService} from '../service/usermessagedata.service'

@Component({
    selector: 'chat',
    moduleId: module.id,
    templateUrl: 'chat-component.html',
})

export class ChatComponent implements OnInit {
    botMessages:Message[];
    but:Message;
    userMessages:UserMessage[];
    button:Message;
    message:Message;
    errorMessage:string;
    index:number;
    replyValue:string;
    debug:string;

    name = 'chat';

    constructor(private _messagedataService:MessageDataService,
                private _usermessageService:UserMessageDataService) {
    }

    getMessage() {
        this._messagedataService.getMessages()
            .then(
                messages => this.botMessages = messages,
                error => this.errorMessage = <any>error);
        this._usermessageService.getMessages()
            .then(
                messages => this.userMessages = messages,
                error => this.errorMessage = <any>error);
    }

    Reply(message:string) {
        this._usermessageService.addMessage()
            .then(

                // TODO: Create UserMessage instance

                messages => this.userMessages.push(messages),   // TODO: push it here!
                error => this.errorMessage = <any>error);
        this.replyValue = '';
    }

    ReplyButton(message:string, debug:string) {
        this._usermessageService.addMessage(message)
            .then(
                messages => this.userMessages.push(messages),
                error => this.errorMessage = <any>error);
    }

    addUserID(message:string, UserID:number) {
        this._usermessageService.addUserID(message, UserID)
            .then(
                messages => this.userMessages.push(messages),
                error => this.errorMessage = <any>error);
    }

    ngOnInit() {

    }
}