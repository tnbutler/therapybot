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
var MessageDataService = (function () {
    function MessageDataService(http) {
        this.http = http;
        this.messagesUrl = 'http://bot.loc:81/demoApi';
    }
    MessageDataService.prototype.getMessages = function () {
        return this.http.get(this.messagesUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    MessageDataService.prototype.addMessage = function (message, debug_info) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        //let options = new RequestOptions({});
        return this.http.post(this.messagesUrl, { message: message, debug_info: debug_info }, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    MessageDataService.prototype.extractData = function (res) {
        var body = res.json();
        console.log('body:', body);
        return body.body || {};
    };
    MessageDataService.prototype.handleError = function (error) {
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
    return MessageDataService;
}());
MessageDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MessageDataService);
exports.MessageDataService = MessageDataService;
//# sourceMappingURL=messagedata.service.js.map