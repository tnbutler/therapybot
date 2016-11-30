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
var core_1 = require("@angular/core");
var messagedata_service_1 = require("../service/messagedata.service");
var usermessagedata_service_1 = require("../service/usermessagedata.service");
var ChatComponent = (function () {
    function ChatComponent(_messagedataService, _usermessageService) {
        this._messagedataService = _messagedataService;
        this._usermessageService = _usermessageService;
        this.name = 'chat';
    }
    ChatComponent.prototype.getMessage = function () {
        var _this = this;
        this._messagedataService.getMessages()
            .then(function (messages) { return _this.botMessages = messages; }, function (error) { return _this.errorMessage = error; });
        this._usermessageService.getMessages()
            .then(function (messages) { return _this.userMessages = messages; }, function (error) { return _this.errorMessage = error; });
    };
    ChatComponent.prototype.Reply = function (message) {
        var _this = this;
        this._usermessageService.addMessage(message)
            .then(
        // TODO: Create UserMessage instance
        function (messages) { return _this.userMessages.push(messages); }, // TODO: push it here!
        function (// TODO: push it here!
            error) { return _this.errorMessage = error; });
        this.replyValue = '';
    };
    ChatComponent.prototype.ReplyButton = function (message, debug) {
        var _this = this;
        this._usermessageService.addMessage(message)
            .then(function (messages) { return _this.userMessages.push(messages); }, function (error) { return _this.errorMessage = error; });
    };
    ChatComponent.prototype.ngOnInit = function () {
        // TODO: Send the first empty message - to get the user ID
    };
    return ChatComponent;
}());
ChatComponent = __decorate([
    core_1.Component({
        selector: 'chat',
        moduleId: module.id,
        templateUrl: 'chat-component.html',
    }),
    __metadata("design:paramtypes", [messagedata_service_1.MessageDataService,
        usermessagedata_service_1.UserMessageDataService])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat-component.js.map