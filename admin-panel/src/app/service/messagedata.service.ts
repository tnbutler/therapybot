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

}