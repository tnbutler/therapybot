/**
 * Created by User on 22.12.2016.
 */
/**
 * Created by dmitry on 20.12.16.
 */
import {Injectable} from '@angular/core'
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ChatReportService {
    //private reportUrl = 'http://therapybot-api.vp-software.com/admin/reports/moodCheckReport';
    private reportUrl = 'https://api.therapybot.io/admin/reports/moodCheckReport';

    constructor(private http: Http) {
    }

    getReports(): Promise<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.reportUrl, options)
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