import {Component, OnInit} from '@angular/core';
import {UserMessageDataService} from './usermessagedata.service';

@Component({
    selector: 'chat',
    styleUrls: [ 'chat.style.scss' ],
    templateUrl: 'chat.template.html',
})

export class ChatComponent implements OnInit {
    userData: any[] = [];
    botData: any[] = [];
    userItem: any;

    errorMessage: string;
    index: number;
    replyValue: string;
    chatSessionIsStarted: boolean = false;
    name = 'chat';

    empty = '';
    id: number;

    userId: number = 0;
    showStyle: boolean = false;

    constructor(private _userMessageDataService: UserMessageDataService) {
    }

    Loading() {
        document.getElementById("loader").style.display = "block";
        document.getElementById("main").style.display = "none";
    }

    Loaded() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").style.display = "block";
    }

    Reply(message: string, buttonId: number) {
        this.Loading();
        this.userItem = {
            user: this.userId,
            message: message,
            buttonId: buttonId
        };
        this.userData.push(this.userItem);
        this.replyValue = '';
        if(buttonId) {
            this._userMessageDataService.addMessage(this.userItem.user, message, buttonId)
                .then(messages => {
                        this.botData.push(messages);
                        this.Loaded();
                    },

                    error => this.errorMessage = <any>error);
            console.log(buttonId);
        } else {
            this._userMessageDataService.addMessage(this.userItem.user, message, 0)
                .then(
                    messages => {
                        this.botData.push(messages);
                        this.Loaded();
                    },
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
        this.Loading();
        console.log('ChatComponent::StartChatSession() is called');
        this.userData = [];
        this.botData = [];
        this._userMessageDataService.empty()
            .then(
                messages => {
                    console.log('Received messages: ', messages);
                    this.userId = messages.user;
                    this.botData.push(messages);
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }
}