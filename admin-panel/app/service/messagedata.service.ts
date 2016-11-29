import {Injectable} from '@angular/core'
import {Message} from '../class/message'
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class MessageDataService {
    private messagesUrl = 'http://bot.loc:81/demoApi';

    constructor(private http:Http) {
    }

    getMessages():Promise<Message[]> {
        return this.http.get(this.messagesUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    addMessage(message:string, debug_info:string):Promise<Message> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        //let options = new RequestOptions({});
        return this.http.post(this.messagesUrl, {message, debug_info}, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res:Response) {
        let body = res.json();
        console.log('body:', body);
        return body.body || {};
    }

    private handleError(error:Response | any) {

        let errMsg:string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}