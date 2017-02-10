
/**
 * Created by User on 12.12.2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {QuestionEditorService} from '../../question-editor/question-editor.service'
import {Rule} from '../rule.class'

import {GlobalVariableEditorService}   from "../../global-variable-editor/global-variable-editor.service";

@Component({
    selector: 'question-editor-detail',
    styleUrls: ['rule-editor-detail.style.scss'],
    templateUrl: 'rule-editor-detail.template.html',
})

export class RuleDetailComponent implements OnInit {
    questionList: any[];
    sysVarsList: any[];
    dictList: any[];
    rulesList: any[];
    rule: Rule = new Rule();
    new_fallbackQuestion: any = null;
    new_target_id: any = null;
    newIsVisible = 1;
    chatVersion: number;
    private sub: any;

    target_id: any;
    newRule: any = false;
    selectedQuestion: any;
    selectedRule: any;
    newQuestion: any;
    hiddenRule: boolean = true;

    userVarChange: boolean = false;
    dictChange: boolean = false;

    errorMessage: string;

    checkQuestionList: boolean = false;
    checkRulesList: boolean = false;

    constructor(private _editorService: QuestionEditorService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    Loading() {
        document.getElementById("loader").style.display = "block";
        document.getElementById("main").style.display = "none";
    }

    Loaded() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").style.display = "block";
    }

    checkModalChangeUserVars() {
        this.userVarChange = true;
    }


    checkModalChangeDict() {
        this.dictChange = true;
    }

    initNewRule(){
        this.Loading();
        this.rule.text = 'New Rule';
        this.target_id = this.selectedQuestion;
        this.rule.chat_node_id = this.selectedQuestion;
        this.rule.is_visible = null;
        this.Loaded();
    }

    getQuestionList() {
        this.Loading();
        this._editorService.getQuestions(this.chatVersion)
            .then(
                questions => {
                    console.log('Received questions: ', questions);
                    this.questionList = questions;
                    if(this.newRule){
                        this.getDictList();
                        this.initNewRule();
                    }
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
    }

    updateRule(rule_text: string, child_chat_node_id: number, is_visible: number, dictionary_id: number) {
        is_visible = is_visible ? 1 : 0;
        this.Loading();
        if (child_chat_node_id == null)
            child_chat_node_id = this.rule.child_chat_node_id;
        if (!this.dictChange)
            dictionary_id = this.rule.dictionary_group_id;
        if (is_visible == null || is_visible == 0)
            is_visible = this.rule.is_visible;
        if (dictionary_id == null)
            dictionary_id = 0;
        console.log(this.selectedQuestion, this.selectedRule, rule_text, child_chat_node_id, is_visible, dictionary_id);
        this._editorService.updateRule(this.selectedQuestion, this.selectedRule, rule_text, child_chat_node_id, is_visible, dictionary_id)
            .then(
                fallback => {
                    console.log('Return: ', fallback);
                    this.dictChange = false;
                    this.onBack();
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }

    addNewRule(rule_text: string, child_chat_node_id: number, is_visible: number, dictionary_id: number) {
        is_visible = is_visible ? 1 : 0;
        this.Loading();
        if (is_visible == null)
            is_visible = 0;
        if (dictionary_id == null)
            dictionary_id = 0;
        console.log(rule_text, child_chat_node_id, is_visible, dictionary_id);
        this._editorService.addNewRule(this.selectedQuestion, rule_text, child_chat_node_id, is_visible, dictionary_id)
            .then(
                fallback => {
                    console.log('Return: ', fallback);
                    this.onBack();
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }

    getRule() {
        this.Loading();
        this._editorService.getRule(this.selectedQuestion, this.selectedRule)
            .then(
                rule => {
                    console.log('Return: ', rule);
                    this.rule = rule;
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }

    getDictList() {
        this._editorService.getDictList()
            .then(
                dictionaries => {
                    console.log('Received dictionaries: ', dictionaries);
                    this.dictList = dictionaries;
                },
                error => this.errorMessage = <any>error);
    }

    onBack() {
        this.newRule = false;
        this.router.navigate(['../question_editor',this.chatVersion]);
    }

    ngOnChanges() {
        //this.getRules(this.selectedQuestion.id);
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.selectedRule = +params['id']; // (+) converts string 'id' to a number
            this.chatVersion = this._editorService.version;
            this.selectedQuestion = this._editorService.selectedQuestionId;
            if (params['id'] != 'new') {
                this.getQuestionList();
                this.getDictList();
                this.getRule();
            }
            else {
                this.newRule = true;
                this.getQuestionList();
            }

        });
    }
}/**
 * Created by Dmitry1 on 02.02.2017.
 */
