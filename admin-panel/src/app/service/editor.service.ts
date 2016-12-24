/**
 * Created by dmitry on 13.12.16.
 */
import {Injectable} from '@angular/core'
import {QuestionData} from '../class/questionData';
import {QuestionList} from '../class/questionList';
import {Dictionaries} from '../class/dictionaries';
import {SysVars} from '../class/sysVars';
import {Rules} from  '../class/rules'
import {Check} from  '../class/successReturn'
import {RuleData} from '../class/ruleData'

import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class EditorService {
    private chatVersion = 1;
    private editorUrl = 'http://bot.loc:81/admin/v' + this.chatVersion;
    private editorURL = 'http://bot.loc:81/admin/v';

    /*
    private editorUrl = 'http://therapybot-api.vp-software.com/admin/v' + this.chatVersion;
    private editorURL = 'http://therapybot-api.vp-software.com/admin/v';
    */

    constructor(private http: Http) {
    }

    getQuestions(chatVersion: number): Promise<QuestionList[]> {
        console.log(chatVersion);

        // TODO: Rework it; it's only a quickfix.
        this.chatVersion = chatVersion;
        this.editorUrl = this.editorURL + this.chatVersion;

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.editorURL + chatVersion + '/questions', options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    addQuestions(question_text: string, user_variable_id: number,
                 not_recognized_chat_node_id: number, is_start_node: number): Promise<Check> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.editorUrl + '/questions', {
            question_text,
            user_variable_id,
            not_recognized_chat_node_id,
            is_start_node
        }, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getQuestion(id: number): Promise<QuestionData> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.editorUrl + '/questions/' + id, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    deleteQuestion(id: number): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.delete(this.editorUrl + '/questions' + '/' + id, options)
            .toPromise()
            .catch(this.handleError);
    }


    updateQuestion(id: number, question_text: string, user_variable_id: number,
                   not_recognized_chat_node_id: number, is_start_node: number): Promise<Check> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.put(this.editorUrl + '/questions' + '/' + id, {
            question_text,
            user_variable_id,
            not_recognized_chat_node_id,
            is_start_node
        }, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getSysVarsList(): Promise<SysVars[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.editorUrl + '/uservars', options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getRulesList(question_id: number): Promise<Rules[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.editorUrl + '/questions/' + question_id + '/rules', options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getRule(question_id: number, rule_id: number): Promise<RuleData> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.editorUrl + '/questions/' + question_id + '/rules/' + rule_id, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    addNewRule(question_id: number, text: string, child_chat_node_id: number, is_visible: number, dictionary_group_id: number): Promise<Check> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.editorUrl + '/questions/' + question_id + '/rules', {
            text,
            child_chat_node_id,
            is_visible,
            dictionary_group_id
        }, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    updateRule(question_id: number, rule_id: number, text: string, child_chat_node_id: number, is_visible: number, dictionary_group_id: number): Promise<Check> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.put(this.editorUrl + '/questions/' + question_id + '/rules/' + rule_id, {
            text,
            child_chat_node_id,
            is_visible,
            dictionary_group_id
        }, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    deleteRule(question_id: number, rule_id: number): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.delete(this.editorUrl + '/questions/' + question_id + '/rules' + '/' + rule_id, options)
            .toPromise()
            .catch(this.handleError);
    }

    getDictList(): Promise<Dictionaries[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.editorUrl + '/dictionaries', options)
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