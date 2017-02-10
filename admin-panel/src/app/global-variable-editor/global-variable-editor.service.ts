import {Injectable} from '@angular/core';
//import {Http, Response} from '@angular/http';
//import {Headers, RequestOptions,URLSearchParams} from '@angular/http';
//import {Observable}     from 'rxjs/Observable';
//import 'rxjs/Rx';

import {AuthService} from '../auth/auth.service';
import {BaseService} from '../auth/base.service'

@Injectable()
export class GlobalVariableEditorService extends BaseService {

    constructor(public authService:AuthService) { super( authService, "/api/global_variable"); }

}