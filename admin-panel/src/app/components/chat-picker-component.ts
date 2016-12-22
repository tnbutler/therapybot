import {Component, OnInit, Directive} from '@angular/core';
import {ChatList} from '../class/chatList';
import {VersionService} from '../service/version.service';

@Component({
    selector: 'chat-picker',
    templateUrl: 'chat-picker-component.html',
})

export class ChatPickerComponent implements OnInit {
    chatList: ChatList[];
    version: ChatList = new ChatList();
    add: ChatList;
    selectedChat: ChatList = new ChatList;
    connectedChat: string;
    errorMessage: string;

    constructor(private _versionService: VersionService) {
    }

    Color(state: string, id: number) {
        if (state == '1')
            return "#b8f3b8";//"CBF08B";
        if (this.selectedChat) {
            if (id == this.selectedChat.id)
                return "#e4e4e4"
        }
    }

    Loading() {
        document.getElementById("loader").style.display = "block";
        document.getElementById("main").style.display = "none";
    }

    Loaded() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").style.display = "block";
    }

    getVersionList() {
        this.Loading();
        this._versionService.getVersions()
            .then(
                versions => {
                    console.log('Received versions: ', versions);
                    this.chatList = versions;
                    this.selectedChat = null;
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
    }

    getVersion() {
        this.Loading();
        this._versionService.getVersion(this.selectedChat.id)
            .then(
                version => {
                    console.log('Received version: ', version);
                    this.version = version;
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
    }

    addVersion(name: string, is_active: number) {
        this.Loading();
        if(is_active == null)
            is_active = 0;
        this._versionService.addVersion(name, is_active)
            .then(
                fallback => {
                    console.log('Received fallback: ', fallback);
                    this.getVersionList();
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
    }

    updateVersion(name: string, is_active: number) {
        this.Loading();
        if(is_active == null)
            is_active = this.selectedChat.is_active;
        this._versionService.updateVersion(this.selectedChat.id, name, is_active)
            .then(
                fallback => {
                    console.log('Received fallback: ', fallback);
                    this.getVersionList();
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
    }

    deleteVersion() {
        this.Loading();
        this._versionService.deleteVersion(this.selectedChat.id)
            .then(
                fallback => {
                    console.log('Received fallback: ', fallback);
                    this.getVersionList();
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
    }

    copyVersion() {
        this.Loading();
        this._versionService.copyVersion(this.selectedChat.id)
            .then(
                fallback => {
                    console.log('Received fallback: ', fallback);
                    this.getVersionList();
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
    }
    ngOnInit(){
        this.getVersionList();
    }
}