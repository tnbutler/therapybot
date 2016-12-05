import {Component, OnInit} from '@angular/core';
import {Message} from '../class/message';
import {UserMessage} from '../class/userMessage';
import {UserMessageDataService} from '../service/usermessagedata.service'

@Component({
    selector: 'chat',
    templateUrl: 'chat-component.html',
})

export class ChatComponent implements OnInit {
    botMessages:Message[] = [];
    botMessage:Message;
    but:Message;
    userMessages:UserMessage[] = [];
    userMessage:UserMessage;

    button:Message;
    message:Message;
    errorMessage:string;
    index:number;
    replyValue:string;
    debug:string;
    chatSessionIsStarted:boolean = false;
    name = 'chat';

    empty = '';
    id:number;

    constructor(private _userMessageDataService:UserMessageDataService) {
    }

    StartChatSession() {
        console.log('ChatComponent::StartChatSession() is called');
        this.userMessages = [];
        this.botMessages = [];
        this._userMessageDataService.empty()
            .then(
                messages => this.botMessage = messages,
                error => this.errorMessage = <any>error);

        setTimeout(() => console.log('debug-1', this.botMessages.push(this.botMessage)), 5000);
        setTimeout(() => console.log('debug-2', this.botMessage.user), 5000);
    }

    Reply(message:string, buttonID:number) {
        this.userMessage = {
            user: this.botMessage.user,
            message: message,
            buttonId: buttonID
        };
        this.userMessages.push(this.userMessage)
        this.replyValue = '';
        this._userMessageDataService.addMessage(this.userMessage.user, message)
            .then(
                // TODO: Create UserMessage instance

                messages => this.botMessages.push(messages),   // TODO: push it here!
                error => this.errorMessage = <any>error);
        this.chatSessionIsStarted = true;
    }

    ngOnInit() {
        console.log('ChatComponent::ngOnInit() is called');
        if (!this.chatSessionIsStarted) {
            this.StartChatSession()
        }
    }
}