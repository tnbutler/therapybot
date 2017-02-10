/**
 * Created by dmitry on 09.01.17.
 */
/**
 * Created by User on 12.12.2016.
 */
import {Component, OnInit, Input, NgZone, OnChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionEditorService} from '../../question-editor/question-editor.service'

@Component({
    selector: 'rules-editor',

    //styleUrls: [ 'rules-editor.style.scss' ],
    templateUrl: 'rules-editor.template.html',
})

export class RulesEditorComponent implements OnChanges, OnInit {
    @Input('selectQuestion') selectedQuestion: any;

    changes: any;
    ifFirstChange: boolean = false;

    dictList: any[];
    rulesList: any[];
    rule: any;
    new_fallbackQuestion: any = null;
    new_target_id: any = null;
    newIsVisible = 1;
    chatVersion: number;
    private sub: any;
    selectedRule: any;
    newRule: any;
    hiddenRule: boolean = true;
    rulesListLen: number = 0;
    len: number;

    userVarChange: boolean = false;
    dictChange: boolean = false;

    errorMessage: string;

    checkQuestionList: boolean = false;
    checkRulesList: boolean = false;

    constructor(private _editorService: QuestionEditorService,
                private route: ActivatedRoute) {
    }


    Color(state: string, id: number) {
        if (state == '1')
            return "#b8f3b8";//"CBF08B";
        if (this.selectedQuestion) {
            if (id == this.selectedQuestion)
                if (!this.hiddenRule)
                    return "#e4e4e4"
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
                    this.new_target_id = 1;
                    this.newIsVisible = 1;
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
        this.checkRulesList = true;
    }

    deleteRule() {
        this.Loading();
        this.rulesList.splice(this.rulesList.indexOf(this.selectedRule), 1);
        this._editorService.deleteRule(this.selectedQuestion, this.selectedRule.id)
            .then(
                fallback => {
                    console.log('Return: ', fallback);
                    this.getRules(this.selectedQuestion);
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }

    selectRule(){
        this._editorService.selectedRuleId = this.selectedRule.id;
    }

    ngOnChanges() {
        if(this.ifFirstChange) {
            console.log(this.selectedQuestion);
            if(this.changes != this.selectedQuestion) {
                this.ngOnInit();
            }
        }
    }

    ngOnInit() {
            //this.getQuestionList();
        this.hiddenRule = false;
        this.getRules(this.selectedQuestion);
        this.ifFirstChange = true;
        this.changes = this.selectedQuestion;

            if (this.checkQuestionList) {
                this.getDictList();
            }
    }

}
