"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var messagedata_service_1 = require('../service/messagedata.service');
var usermessagedata_service_1 = require('../service/usermessagedata.service');
var ChatComponent = (function () {
    function ChatComponent(_messageDataService, _userMessageDataService) {
        this._messageDataService = _messageDataService;
        this._userMessageDataService = _userMessageDataService;
        this.botMessages = [];
        this.userMessages = [];
        this.state = false;
        this.name = 'chat';
        this.empty = '';
    }
    ChatComponent.prototype.Empty = function () {
        var _this = this;
        this._userMessageDataService.empty()
            .then(function (messages) { return _this.botMessage = messages; }, function (error) { return _this.errorMessage = error; });
        setTimeout(function () { return console.log(_this.botMessages.push(_this.botMessage)); }, 1000);
        setTimeout(function () { return console.log(_this.botMessage.user); }, 1000);
    };
    ChatComponent.prototype.Reply = function (message, buttonID) {
        var _this = this;
        this.userMessage = { user: this.botMessage.user, message: message, buttonId: buttonID };
        this.userMessages.push(this.userMessage);
        this.replyValue = '';
        this._userMessageDataService.addMessage(this.userMessage.user, message)
            .then(
        // TODO: Create UserMessage instance
        function (messages) { return _this.botMessages.push(messages); }, // TODO: push it here!
        function (// TODO: push it here!
            error) { return _this.errorMessage = error; });
    };
    ChatComponent.prototype.ngOnInit = function () {
        // TODO: Send the first empty message - to get the user ID
        if (!this.state) {
            this.Empty();
        }
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'chat',
            moduleId: module.id,
            templateUrl: 'chat-component.html',
        }), 
        __metadata('design:paramtypes', [messagedata_service_1.MessageDataService, usermessagedata_service_1.UserMessageDataService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat-component.js.map