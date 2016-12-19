/**
 * Created by User on 12.12.2016.
 */
import {Component, OnInit} from '@angular/core';
import {QuestionList} from '../class/questionList'
import {SysVars} from '../class/sysVars';
import {Dictionaries} from '../class/dictionaries';
import {Rules} from '../class/rules';
import {EditorService} from '../service/editor.service';
import {RuleData} from '../class/ruleData';
import {isNumber} from "util";
import {QuestionData} from "../class/questionData";

@Component({
    selector: 'editor',
    templateUrl: 'editor-component.html',
})

export class EditorComponent implements OnInit {
    questionList: QuestionList[];
    sysVarsList: SysVars[];
    dictList: Dictionaries[];
    rulesList: Rules[];
    rule: RuleData = new RuleData();
    question: QuestionData = new QuestionData();

    selectedQuestion: QuestionList;
    selectedRule: Rules;
    newQuestion: QuestionList = new QuestionList();
    newRule: Rules = new Rules();
    hiddenRule: boolean = true;
    rulesListLen: number = 0;
    len: number;

    userVarChange: boolean = false;
    dictChange: boolean = false;

    errorMessage: string;

    checkQuestionList: boolean = false;
    checkRulesList: boolean = false;

    constructor(private _editorService: EditorService) {
    }

    Color(state: string, id: number) {
        if (state == '1')
            return "green";//"CBF08B";
        if (this.selectedQuestion) {
            if (id == this.selectedQuestion.id)
                if (!this.hiddenRule)
                    return "grey"
        }
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

    getQuestionList() {
        this.Loading();
        this._editorService.getQuestions()
            .then(
                questions => {
                    console.log('Received questions: ', questions);
                    this.len = questions.length;
                    this.questionList = questions;
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
        this.checkQuestionList = true;
    }

    getQuestion() {
        this.Loading();
        this._editorService.getQuestion(this.selectedQuestion.id)
            .then(
                question => {
                    console.log('Received question: ', question);
                    this.question = question;
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
    }

    getSysVarList() {
        this._editorService.getSysVarsList()
            .then(
                sysVars => {
                    console.log('Received system variables: ', sysVars);
                    this.sysVarsList = sysVars;
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

    getRules(id: number) {
        this.Loading();
        this._editorService.getRulesList(id)
            .then(
                rules => {
                    console.log('Received rules: ', rules);
                    this.rulesList = rules;
                    this.rulesListLen = rules.length;
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
        this.checkRulesList = true;
    }

    addNewQuestion(question_text: string, user_variable_id: number, node_id: number, start: number) {
        this.Loading();
        if (start == null)
            start = 0;
        this._editorService.addQuestions(question_text, user_variable_id, node_id, start)
            .then(
                fallback => {
                    console.log('Return: ', fallback);
                    this.getQuestionList();
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }

    addNewRule(rule_text: string, child_chat_node_id: number, is_visible: number, dictionary_id: number) {
        this.Loading();
        if (is_visible == null)
            is_visible = 0;
        this._editorService.addNewRule(this.selectedQuestion.id, rule_text, child_chat_node_id, is_visible, dictionary_id)
            .then(
                fallback => {
                    console.log('Return: ', fallback);
                    this.getRules(this.selectedQuestion.id);
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }

    updateRule(rule_text: string, child_chat_node_id: number, is_visible: number, dictionary_id: number) {
        is_visible = is_visible ? 1 : 0;
        this.Loading();
        if (child_chat_node_id == null)
            child_chat_node_id = this.rule.child_chat_node_id;
        if (!this.dictChange)
            dictionary_id = this.rule.dictionary_group_id;
        if (is_visible == null)
            is_visible = this.rule.is_visible;
        console.log(this.selectedQuestion.id, this.selectedRule.id, rule_text, child_chat_node_id, is_visible, dictionary_id);
        this._editorService.updateRule(this.selectedQuestion.id, this.selectedRule.id, rule_text, child_chat_node_id, is_visible, dictionary_id)
            .then(
                fallback => {
                    console.log('Return: ', fallback);
                    this.getRules(this.selectedQuestion.id);
                    this.dictChange = false;
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }

    getRule() {
        this.Loading();
        this._editorService.getRule(this.selectedQuestion.id, this.selectedRule.id)
            .then(
                rule => {
                    console.log('Return: ', rule);
                    this.rule = rule;
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }

    updateQuestion(text: string, user_variable_id: number, node_id: number, start: number) {
        this.Loading();
        console.log(this.userVarChange);
        if (node_id == null)
            node_id = this.question.not_recognized_chat_node_id;
        if (!this.userVarChange)
            user_variable_id = this.question.user_variable_id;
        if (start == null)
            start = this.question.is_start_node;
        this._editorService.updateQuestion(this.selectedQuestion.id, text, user_variable_id, node_id, start)
            .then(
                fallback => {
                    console.log('Return: ', fallback);
                    this.getQuestionList();
                    this.userVarChange = false;
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);

    }

    deleteQuestion() {
        this.Loading();
        this.questionList.splice(this.questionList.indexOf(this.selectedQuestion), 1);
        this._editorService.deleteQuestion(this.selectedQuestion.id)
            .then(
                fallback => {
                    console.log('Return: ', fallback);
                    this.getQuestionList();
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }

    deleteRule() {
        this.Loading();
        this.rulesList.splice(this.rulesList.indexOf(this.selectedRule), 1);
        this._editorService.deleteRule(this.selectedQuestion.id, this.selectedRule.id)
            .then(
                fallback => {
                    console.log('Return: ', fallback);
                    this.getRules(this.selectedQuestion.id);
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }


    ngOnInit() {
        this.getQuestionList();
        if (this.checkQuestionList) {
            this.getSysVarList();
            this.getDictList();
        }
        console.log();
    }
}