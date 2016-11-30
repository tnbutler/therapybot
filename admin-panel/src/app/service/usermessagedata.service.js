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
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
require("rxjs/Rx");
require("rxjs/add/observable/throw");
var UserMessageDataService = (function () {
    function UserMessageDataService(http) {
        this.http = http;
        this.messagesUrl = 'http://bot.loc:81/demoApi';
    }
    UserMessageDataService.prototype.getMessages = function () {
        return this.http.get(this.messagesUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    UserMessageDataService.prototype.addMessage = function (message) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.messagesUrl, { message: message }, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    UserMessageDataService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    UserMessageDataService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    return UserMessageDataService;
}());
UserMessageDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserMessageDataService);
exports.UserMessageDataService = UserMessageDataService;
//# sourceMappingURL=usermessagedata.service.js.map