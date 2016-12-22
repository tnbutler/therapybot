import {Injectable} from '@angular/core'
import {ChatList} from '../class/chatList';

import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class VersionService {
    private versionUrl = 'http://bot.loc:81/admin/versions';

    constructor(private http: Http) {
    }

    getVersions(): Promise<ChatList[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.versionUrl, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getVersion(chatVersion: number): Promise<ChatList> {
        console.log(chatVersion);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.versionUrl + '/' + chatVersion, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    addVersion(name: string, is_active: number): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.versionUrl, {name, is_active}, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    updateVersion(chatVersion: number, name: string, is_active): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.put(this.versionUrl + '/' + chatVersion, {name, is_active}, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    deleteVersion(chatVersion: number): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.delete(this.versionUrl + '/' + chatVersion, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    copyVersion(chatVersion: number): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.versionUrl + '/copy/' + chatVersion, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
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