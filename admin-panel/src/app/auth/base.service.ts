///<reference path="../../../node_modules/@angular/http/src/http.d.ts"/>
/**
 * Created by Alexander Spazhev on 16.10.2016.
 */

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions,URLSearchParams} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx'  //country.service
//import { Observable } from 'rxjs/Rx';

//import {API_URL} from '../app.env';

import {AuthService} from './auth.service';

//import {CookieService} from 'angular2-cookie/core';

//import {DOCUMENT} from '@angular/platform-browser';

export class BaseService {

    public baseURL:string = ''; // API_URL + this.prefix;
    public booleans: string[] = [];
    public dates: string[] = [];

    constructor(public authService:AuthService,private prefix:string){
        this.baseURL = authService.getApiUrl() + prefix;
    }

    param(item:any, key:string):string {
        return (item)? (item[key] ? `&${key}=${item[key]}` : '' ) : '';
    }

    getItem(id:any,params:any) {

        let url:string = `${this.baseURL}/${id}`;

        let amp = '?';
        if (params) {
            for (let key in params) {
                url = url + `${amp}${key}=${params[key]}`;
                amp = '&';
            }
        }

        return this.authService.get(url).
            map((item)=>{
                for (let key of this.booleans) {
                    //if (!(key in item)) {   // item.hasOwnProperty(key);
                    //    console.log(key);
                    //    throw new Error();//`Field <${key}> is not defined.`);
                    //}
                    if (key in item) {   // item.hasOwnProperty(key);
                        item[key] = this.authService.sqlToBoolean(item[key]);
                    }
                }

                for (let key of this.dates) {
                    if (key in item) {
                        item[key] = this.authService.sqlToDate(item[key]);
                    }
                }
                return item;
            });

    }

    getItems(item:any,params:any){

        let url = this.baseURL;

        var paramStr = '';
        let amp = '?';
        if (item) {

            for (let key of ['page', 'filter', 'orderby']) {
                if (item[key]) {
                    paramStr = paramStr + `${amp}${key}=${item[key]}`;
                    amp = '&';
                }
            }
        }
        if (params) {
            for (let key in params) {

                if (key == '__path__') {
                    url = url + '/'+ params[key];
                } else {
                    paramStr = paramStr + `${amp}${key}=${params[key]}`;
                    amp = '&';
                }
            }
        }

        return this.authService.get(url+paramStr).
            map((result)=>{
                if (result.data) {
                    for (let item of result.data) {
                    //elem.approved = this.userService.authService.sqlToBoolean(elem.approved);
                    //console.log(item);


                    for (let key of this.booleans) {
                        //console.log(key);
                        if (key in item) {   // item.hasOwnProperty(key);
                             item[key] = this.authService.sqlToBoolean(item[key]);
                        }
                    }

                //    for (let key of this.dates) {
                //        if (key in item) {
                //            item[key] = this.authService.sqlToDate(item[key]);
                //        }
                //    }
                    }
                }

            return result;
        });


    }

    post(item:any ){

        let url:string = `${this.baseURL}`;

        if (item.id) {
            url = `${url}/${item.id}`;
        }

        for (let key of this.dates) {
            if (key in item) {
                item[key] = this.authService.dateToSql(item[key]);
            }
        }

        return this.authService.post(url,item);
    }

    delete(id:any ){
        let url:string = `${this.baseURL}/${id}`;
        return this.authService.delete(url);
    }



//    private handleError (error: Response) {
//        console.error(error.text());
//        return Observable.throw(error.json() || ' error');
//    }

    //------------------------------------------------------------------------------
    /*
    getChartTemplateType() { return this.authService.getReference('chart_template_type')}

    getUser() { return this.authService.getReference('user') }
     */
    //------------------------------------------------------------------------------

    // helper
    lookupName(arr,id) {
        var name = '';
        for (let elem of arr) {
            if (elem.id == id) {
                name = elem.name;
                break;
            }
        }
        return name;
    }


}