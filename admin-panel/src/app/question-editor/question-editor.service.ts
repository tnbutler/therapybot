/**
 * Created by dmitry on 13.12.16.
 */
import {Injectable} from '@angular/core'

import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class QuestionEditorService {
    private chatVersion = 1;
    private editorUrl = 'https://api.therapybot.io/admin/v' + this.chatVersion;
    private editorURL = 'https://api.therapybot.io/admin/v';


    public version;
    public selectedChat;
    public lastQuestionId;
    public selectedQuestionId;
    public selectedRuleId;

    /*
     private editorUrl = 'http://therapybot-api.vp-software.com/admin/v' + this.chatVersion;
     private editorURL = 'http://therapybot-api.vp-software.com/admin/v';
     */

    constructor(private http: Http) {
    }

    setChatVersion(id: any) {
        this.version = id;
    }

    getQuestions(chatVersion: number): Promise<any[]> {
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
                 not_recognized_chat_node_id: number, is_start_node: number): Promise<any> {
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

    getQuestion(id: number): Promise<any> {
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
                   not_recognized_chat_node_id: number, is_start_node: number): Promise<any> {
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

    getAllVariables(): Promise<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get('https://api.therapybot.io/api/user_variable?chat_version_id='+this.version, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getRulesList(question_id: number): Promise<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.editorUrl + '/questions/' + question_id + '/rules', options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getRule(question_id: number, rule_id: number): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        console.log(this.editorUrl + '/questions/' + question_id + '/rules/' + rule_id);
        return this.http.get(this.editorUrl + '/questions/' + question_id + '/rules/' + rule_id, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    addNewRule(question_id: number, text: string, child_chat_node_id: number, is_visible: number, dictionary_group_id: number): Promise<any> {
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

    updateRule(question_id: number, rule_id: number, text: string, child_chat_node_id: number, is_visible: number, dictionary_group_id: number): Promise<any> {
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

    getDictList(): Promise<any[]> {
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
}/**
 * Created by Dmitry1 on 02.02.2017.
 */
