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
    botMessage: Message;
    but: Message;
    userMessages: UserMessage[] = [];
    userMessage: UserMessage;

    button: Message;
    message: Message;
    errorMessage: string;
    index: number;
    replyValue: string;
    debug: string;
    state: boolean = false;
    name = 'chat';

    empty = '';
    id: number;

    constructor(private _userMessageDataService: UserMessageDataService) {
    }

    Empty() {
        this.userMessages = [];
        this.botMessages = [];
        this._userMessageDataService.empty()
            .then(
                messages => this.botMessage = messages,
                error => this.errorMessage = <any>error);

        setTimeout(() => console.log(this.botMessages.push(this.botMessage)), 1000);
        setTimeout(() => console.log(this.botMessage.user), 1000);
    }

    Reply(message: string,buttonID: number) {
        this.userMessage = {user: this.botMessage.user, message: message, buttonId: buttonID };
        this.userMessages.push(this.userMessage)
        this.replyValue = '';
        this._userMessageDataService.addMessage(this.userMessage.user, message)
            .then(
                // TODO: Create UserMessage instance

                messages => this.botMessages.push(messages),   // TODO: push it here!
                error => this.errorMessage = <any>error);
        this.state = true;
    }

    ngOnInit() {
        // TODO: Send the first empty message - to get the user ID
        if (!this.state) {
            this.Empty()
        }

    }
}