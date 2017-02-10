/**
 * Created by Alexander Spazhev on 26.10.2016.
 */

import { Injectable } from '@angular/core';
import {Http, Response,ResponseContentType} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';  //country.service
import { Subject }    from 'rxjs/Subject';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

import * as moment from 'moment';

import {SpinnerService} from '../spinner/spinner.service'

import { environment } from '../../environments/environment';

//import {API_URL, API_NOTIFICATION, API_NOTIFICATION_INTERVAL, API_REMEMBER_ME } from '../app.env';

const AUTH_TOKEN_NAME = 'auth_token';
const LOGGED_USER_ID  = 'logged_user_id'; // real "remember me"

//const THOUSANDS_SEPARATOR = '\\s';

@Injectable()
export class AuthService {

    private loggedIn = false;
    private loggedUser: any = {};
    private loggedToken: string = '';
    private loggedUserId: number = 0;

    public  redirectUrl: string;
    public  prevImgUrl: string = '';
    public  prevImgBlob: any;

    private photoAnnouncedSource = new Subject<string>();
    private unreadAnnouncedSource = new Subject<number>();
    private unreadProc: boolean = false;

//    private _uploadOptions: Object = null;

    photoAnnounced$ = this.photoAnnouncedSource.asObservable();
    unreadAnnounced$ = this.unreadAnnouncedSource.asObservable();


    getApiUrl() {
        //return API_URL;
        return environment.API_URL;
    }

    getNotificationCount() {
        if (!this.unreadProc && this.isLoggedIn()) {

            this.unreadProc = true;
            let url:string = this.getApiUrl() + `/api/notification/count`;

            this.get(url)
                .subscribe(
                (result)=> {
                    this.unreadProc = false;
                    let unread:number = (+result.count) - (+result.red);
                    this.announceUnread(unread);
                },
                (error)=> {
                    this.unreadProc = false;
                });
        }
    }


    constructor(private http: Http,public router:Router,private location: Location,private spinnerService:SpinnerService) {

        if (environment.API_REMEMBER_ME) {
//            if (API_REMEMBER_ME) {
            this.loggedIn = !!localStorage.getItem(AUTH_TOKEN_NAME); // remember me always
            this.loggedUser  = this.loggedIn ? JSON.parse(localStorage.getItem('user')): {};
            this.loggedToken = this.loggedIn ? localStorage.getItem(AUTH_TOKEN_NAME) :'';
        }

        this.loggedUserId = !!localStorage.getItem(LOGGED_USER_ID) ? +localStorage.getItem(LOGGED_USER_ID) : 0;

        //this.getNotificationCount();

        if (environment.API_NOTIFICATION) {

            IntervalObservable.create(environment.API_NOTIFICATION_INTERVAL * 1000)
                .subscribe(n => { this.getNotificationCount() });
        }

        console.log('auth service created');
    }

    storeUser(res) {

        this.loggedIn = true;
        this.loggedUser = res;
        this.loggedToken = res.auth_token;

        if (this.loggedUserId != res.id) {
            this.loggedUserId = res.id;
            this.redirectUrl = '';                  // *** start page ***
            localStorage.setItem(LOGGED_USER_ID, ''+this.loggedUserId);
        }

        if (environment.API_REMEMBER_ME) {
            localStorage.setItem(AUTH_TOKEN_NAME, res.auth_token);
            localStorage.setItem('user', JSON.stringify(res));
        }
    }

    clearUser() {
        this.loggedIn = false;
        this.loggedUser = {};
        this.loggedToken = '';

        localStorage.removeItem(AUTH_TOKEN_NAME);
        localStorage.removeItem('user');
    }


    isLoggedIn() {

        //let res =!!localStorage.getItem(AUTH_TOKEN_NAME);
        return this.loggedIn; //  res;
    }

    checkRegister(email) {

        let url:string = this.getApiUrl() +`/api/checkregister?email=${email}`;
        return this.http.get(url).map(res => res.json());

    }



    login(email, password) {

        //this._uploadOptions = null;

        let body = JSON.stringify({ email, password });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        let url:string = this.getApiUrl() +'/api/login';

        let response: any = this.http.post(url,body,options);

        return response
            .map(res => res.json())
            .map((res) => {
                if (res) {
                    //console.log(res);

                    if (!!res.auth_token) {

                        if (res.need_subscription) {
                            // buy subscription first
                        }
                        this.storeUser(res);
                    }
                };
                return res;
            });

    }

    token() {
        return this.loggedToken; // !!localStorage.getItem(AUTH_TOKEN_NAME)? localStorage.getItem(AUTH_TOKEN_NAME) :'';
    }

    reset(email) {

        let body = JSON.stringify({ email});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        let url:string = this.getApiUrl() +'/api/reset';

        let response: any = this.http.post(url,body,options);

        return response
            .map(res => res.json())

    }

    approve(user_id,email,sendEmail) {

        let url:string = this.getApiUrl() +`/api/approve/${user_id}`;

        return this.post(url,sendEmail? { email: email} :'');
    }

    cancelApprovement(user_id,email,sendEmail) {

        let url:string = this.getApiUrl() +`/api/disapprove/${user_id}`;

        return this.post(url,sendEmail? { email: email} :'');
    }

    changeregister(item) {

        let auth_token= this.token();

        let body = JSON.stringify(item); // { password, password_confirm}
        let headers = new Headers({ 'Content-Type': 'application/json' });

        headers.append('X-CSRF-TOKEN', `${auth_token}`);

        let options = new RequestOptions({ headers: headers, method: "post" });

        let url:string = this.getApiUrl() +'/api/changeregister';

        let response: any = this.http.post(url,body,options);

        return response
            .map(res => res.json())
    }


    logout() {

        let auth_token= this.token();

        if (auth_token) {

            let url:string = this.getApiUrl() + '/api/logout';
            let body = JSON.stringify({});
            let headers = new Headers({'Content-Type': 'application/json'});

            headers.append('X-CSRF-TOKEN', `${auth_token}`);

            let options = new RequestOptions({headers: headers, method: "post"});

            //url = url + `?auth_token=${auth_token}`;

            let response:any = this.http.post(url, body, options);

            response
                .subscribe(
                (res) => {

                },
                (error) => {

                });

            //console.log('remove: ' + auth_token);
        };

        this.clearUser();

        //this._uploadOptions = null;
    }

    register(item:any)
    {
        let body = JSON.stringify(item);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        let url:string = this.getApiUrl() +'/api/register';

        let response: any = this.http.post(url,body,options);

        return response
            .map(res => res.json());
    }


    redirect() {

        let redir = this.redirectUrl ? this.redirectUrl : '';
        this.router.navigate([redir]);
    }

    redirectLogin() {
        this.router.navigate(['/login']);
    }


    extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    handleError (error: Response | any) {

        let errMsg: string;
        if (error instanceof Response) {
            if ((+error.status == 401)) {
//                console.log(`auth.service ERROR: status ${+error.status}`);
//                console.log(`do logout`);
//                console.log(this);

                this.logout();
                this.redirectLogin();
                return;
            }
            else {


            //const body = error.json() || '';
            //const err = body.error || JSON.stringify(body);
            const err = '';
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

            console.log(error);
            };
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error('auth.service');
        return Observable.throw(errMsg);
    }

    doNothing() {}

    back() { this.location.back()}

    toDetail(link:any) {
        this.router.navigate(link);

    }

    navigate(link:any,data={}) {
        this.routeData = data;
        this.router.navigate(link);
    }


    public httpOptions(/* method */): RequestOptions {

        let auth_token = this.token();
        let headers = new Headers({ 'Content-Type': 'application/json','X-CSRF-TOKEN': auth_token });
        let options = new RequestOptions({ headers: headers, /* method: method */});
        return options;
    }

    public get(url: string) {

        let options = this.httpOptions(/* "get" */);

        let serve = this.http.get(url, options)

//            .retryWhen(error => error.delay(500))
//            .timeout(2000, new Error('delay exceeded'))
            .map( res => this.extractData(res))
            .share(); // two or more subscriptions

        serve.subscribe(null,err => this.handleError(err)); // service error handle

        return serve;
    }

    public getBlob(url: string) {

        let auth_token = this.token();
        let headers = new Headers({ 'X-CSRF-TOKEN': auth_token });
        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob} );

        return this.http.get(url, options)
    }


    public post(url:string,item:any ){

        let options = this.httpOptions(/*"post"*/);

        let body = JSON.stringify(item);

        return this.http.post(url,body,options).
            map(res => res.json());

    }

    delete(url:string ) {

        let options = this.httpOptions(/* "delete" */);

        return this.http.delete(url,options)
            .map(res => res.json());

    }


    // LOCKED  -------------------------------------------------------------


    public locked(url: string) {

        //remove /app/ from client url

        let apiUrl = this.getApiUrl() +'/api/'+url.substring(5)+'/locked';

        //console.log('authService.locked',apiUrl);

        let options = this.httpOptions();
        return this.http.get(apiUrl,options).map(res => res.json());
    }

    accessUrl(url:string) {
        //remove /app/ from client url

        let normalUrl = url.substring(5).split(';')[0];

        let apiUrl = this.getApiUrl() +'/api/'+normalUrl+'/access';
        return apiUrl;
    }

    public access(url: string) {

        let apiUrl = this.accessUrl(url);

        let options = this.httpOptions();
        return this.http.get(apiUrl,options).map(res => res.json());
    }

    public accessRequest(url: string,item:any) {

        let apiUrl = this.accessUrl(url);
        return this.post(apiUrl,item);
    }

    // OCCUPATIONS & PROVINCES & other references -------------------------------------------------------------

    public getReference(list: string) {

        let url:string = this.getApiUrl() +'/api/reference?data='+list;
        let options = this.httpOptions();

        return this.http.get(url,options).map(res => res.json());
    }

    public getLogReference(list: string) {  // with login

        let url:string = this.getApiUrl() +'/api/logreference?data='+list;
        let options = this.httpOptions();

        return this.http.get(url,options).map(res => res.json());
    }

    public dateFmt(value) {
        var fmt = 'DD MMM YYYY'; // 'MMM DD, YYYY';
        return moment(value).format(fmt);
    }

    //  SESSION -----------------------------------------------------------------------------------------------

    public user():any {
        return this.loggedUser; // JSON.parse(localStorage.getItem('user'));
    }

    private get authUser() {
        return  this.user();
    }

    public needMembership() {
        return this.authUser.need_subscription;
    }

    public userFirstName():string {
        return this.authUser.first_name ? this.authUser.first_name : '';
    }

    public userLastName():string {
        return this.authUser.last_name ? this.authUser.last_name : '';
    }

    public userPhoto():string {
        return this.authUser.photo ? this.authUser.photo : '';
    }

    public isadmin () {
        return this.authUser.isadmin;
    }

    public isguest () {
        return this.authUser.isguest;
    }

    public stripe_key () {
        return this.authUser.stripe_key;
    }

    public email () {
        return this.authUser.email
    }

    basicMembershipPaymentAmount() {
        return this.authUser.basic_membership_payment_amount;
    }

    public user_id() {
        return this.user().id;
    }

    public isUser(id) {
        return id == this.user_id();
    }

    announcePhoto(photo: string) {

        this.authUser.photo = photo;
        this.photoAnnouncedSource.next(photo);
    }

    // IMAGE ---------------------------------------------------------------------------------------------------

    public uploadOptions():Object {

//        if (!this._uploadOptions) {

            let auth_token = this.token();
            let options = {
//          this._uploadOptions = {
                url: this.getApiUrl() + '/api/upload',
                customHeaders: {
                    'X-CSRF-TOKEN': auth_token,
                }
            }
            return options;
//        }

//        return this._uploadOptions;
    }

    // SUBSCRIPTIONS --------------------------------------------------------------------------------------------

    public getSubscription() {

        let user_id = this.user_id();

        let url:string = this.getApiUrl() +`/api/subscription?user_id=${user_id}`;
        let options = this.httpOptions();

        return this.http.get(url,options).map(res => res.json());

    }


    // TO APPROVE     --------------------------------------------------------------------------------------------

    public toApprove() {
        let url:string = this.getApiUrl() +`/api/user/to_approve`;
        return this.get(url);
    }

    // ----------------------------------------------------------------------------------------------------------


    public sqlToBoolean (value:any): any {
        return (+value) ? true: false;
    }


    public sqlToDate (value:any): any {

        if (!value) { return null};
        let [yyyy,mm, dd] = value.split(' ')[0].split('-');
        return `${dd}/${mm}/${yyyy}`;
    }


    public dateToSql (value,time?) {

        //console.log(value,time);
        if (!value) { return null};

        let [dd,mm, yyyy] = value.split('/');

        let tm = time ? ' '+time : '';
        return `${yyyy}-${mm}-${dd}${tm}`
    }

    public timeToSql (value) {

        if (!value) { return null};

        let [hh,mm] = value.split(':');
        return `${hh}:${mm}`
    }

    public sqlToTime (value:any): any {

        if (!value) { return null};
        let [hh,mm] = value.split(' ')[1].split(':');
        return `${hh}:${mm}`;
    }

    public numToSql (value:string) {
        if (value) {
            return value.replace(/[^0-9\.\-\+]/g, "");
//            return value.replace(new RegExp(THOUSANDS_SEPARATOR,'g'), "");
        }
        return '0.00';
    }

    showMessage(message:string,header?){
        this.spinnerService.showMessage(message,header);
    }

    showError(error){
        let errMsg = error;
        if (error instanceof Response) {
            if ((+error.status == 401)) {
//                console.log(`auth.service ERROR: status ${+error.status}`);
//                console.log(`do logout`);
//                console.log(this);
                const errMsg = error.toString(); // '';

//                this.logout();
//                this.redirectLogin();
//                return;
            }
            else {


                //const body = error.json() || '';
                //const err = body.error || JSON.stringify(body);
                const errMsg = error.toString(); // '';
                //errMsg = `${error.status} - ${error.statusText || ''} >>${err}`;

                console.log(error);
            };
        } else {
            errMsg = error.message ? error.message : error.toString();
        }


        this.spinnerService.showMessage(errMsg,'Sorry');
    }

    spinnerStart() {
        this.spinnerService.start();

    }

    spinnerStop() {
        this.spinnerService.stop();

    }

    //------------------------------------------------------------------------------------------------------

    buyRStore(body) {

        let url:string = this.getApiUrl() +`/api/rstore`;
        let options = this.httpOptions();

        return this.http.post(url,body,options)
            .map(res => res.json());

    }

    buySubscription(body) {

        let url:string = this.getApiUrl() +`/api/subscription/buy`;
        let options = this.httpOptions();

        return this.http.post(url,body,options)
            .map(res => res.json());
    }


    announceUnread(unread) {
        this.unreadAnnouncedSource.next(unread);
    }

    //----------------------------------------------------------------------------------------------------

    private _routeData: any = {};

    public set routeData(data) {
        this._routeData = data;
    }

    public get routeData() {
        if (this._routeData) return this._routeData;
        return {};
    }

    public copy(url,item) {
        let options = this.httpOptions(/*"post"*/);
        url = url + item;
        console.log(url);
        return this.http.post(url,options).
        map(res => res.json());
    }

}
