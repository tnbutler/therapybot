import {Component, OnInit} from '@angular/core';
import {Message} from '../class/message';
import {UserMessage} from '../class/userMessage';
import {UserMessageDataService} from '../service/usermessagedata.service'

@Component({
    selector: 'chat',
    templateUrl: 'chat-component.html',
})

export class ChatComponent implements OnInit {
    botMessages: Message[] = [];
    but: Message;
    userMessages: UserMessage[] = [];
    userMessage: UserMessage;

    button: Message;
    message: Message;
    errorMessage: string;
    index: number;
    replyValue: string;
    debug: string;
    chatSessionIsStarted: boolean = false;
    name = 'chat';

    empty = '';
    id: number;

    userId: number = 0;
    showStyle: boolean = false;

    constructor(private _userMessageDataService: UserMessageDataService) {
    }

    Reply(message: string, buttonId: number) {
        this.userMessage = {
            user: this.userId,
            message: message,
            buttonId: buttonId
        };
        this.userMessages.push(this.userMessage);
        this.replyValue = '';
        if(buttonId) {
            this._userMessageDataService.addMessage(this.userMessage.user, message, buttonId)
                .then(
                    messages => this.botMessages.push(messages),
                    error => this.errorMessage = <any>error);
            console.log(buttonId);
        } else {
            this._userMessageDataService.addMessage(this.userMessage.user, message, 0)
                .then(
                    messages => this.botMessages.push(messages),
                    error => this.errorMessage = <any>error);
        }
        this.chatSessionIsStarted = true;
        this.showStyle = false;
    }

    ngOnInit() {
        console.log('ChatComponent::ngOnInit() is called');
        if (!this.chatSessionIsStarted) {
            this.StartNewChat();
        }
    }

    Show() {
        if (this.showStyle) {
            return "none";
        } else {
            return "block";
        }
    }

    StartNewChat() {
        console.log('ChatComponent::StartChatSession() is called');
        this.userMessages = [];
        this.botMessages = [];
        this._userMessageDataService.empty()
            .then(
                messages => {
                    console.log('Received messages: ', messages);
                    this.userId = messages.user;
                    this.botMessages.push(messages);
                },
                error => this.errorMessage = <any>error);
    }
}