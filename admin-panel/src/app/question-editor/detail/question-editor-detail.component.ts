/**
 * Created by User on 12.12.2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {QuestionEditorService} from '../question-editor.service';
import {Question} from '../question.class'

@Component({
    selector: 'question-editor-detail',
    styleUrls: ['question-editor-detail.style.scss'],
    templateUrl: 'question-editor-detail.template.html',
})

export class QuestionDetailComponent implements OnInit {
    questionList: any[];
    sysVarsList: any;
    dictList: any[];
    rulesList: any[];
    rule: any;
    question: Question = new Question();
    selectedQ: Question = new Question();
    firstQ: Question = new Question();
    new_fallbackQuestion: any = null;
    new_target_id: any = null;
    newIsVisible = 1;
    chatVersion: number;
    private sub: any;

    fallbackQuestion: any;
    selectedQuestion: any;
    not_recog: any;
    selectedRule: any;
    newQuestion: any = false;
    newRule: any = false;
    hiddenRule: boolean = true;
    rulesListLen: number = 0;
    len: number;

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

    initNewQuestion() {
        this.question.question_text = 'New question';
        if(this.questionList.length != 0) {
            this.question.not_recognized_chat_node_id = this.firstQ.id;
            this.fallbackQuestion = this.question.not_recognized_chat_node_id;
        }
       // this.question.not_recognized_chat_node_id = this.firstQ.id;
        this.question.user_variable_id = null;
        //this.fallbackQuestion = this.question.not_recognized_chat_node_id;
    }


    getQuestionList() {
        this.Loading();
        this._editorService.getQuestions(this.chatVersion)
            .then(
                questions => {
                    console.log('Received questions: ', questions);
                    this.questionList = questions;
                    if(this.newQuestion) {
                        this.firstQ = this.questionList[0];
                        this.initNewQuestion();
                    }
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
        this.checkQuestionList = true;
    }

    getQuestion() {
        this.Loading();
        this.getQuestionList();
        this.getAllVariables();
        this._editorService.getQuestion(this.selectedQuestion)
            .then(
                question => {
                    console.log('Received question: ', question);
                    this.question = question;
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
    }

    addNewQuestion(question_text: string, user_variable_id: number, node_id: number, start: number) {
        this.Loading();
        if (start == null)
            start = 0;
        this._editorService.addQuestions(question_text, user_variable_id, node_id, start)
            .then(
                fallback => {
                    console.log('Return: ', fallback);
                    this.onBack();
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }

    getAllVariables() {
        this._editorService.getAllVariables()
            .then(
                sysVars => {
                    console.log('Received system variables: ', sysVars);
                    this.sysVarsList = sysVars;
                    this.sysVarsList = this.sysVarsList.data;
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
        if (user_variable_id == null)
            user_variable_id = 0;
        if (start == null)
            start = this.question.is_start_node;
        console.log(user_variable_id)
        this._editorService.updateQuestion(this.selectedQuestion, text, user_variable_id, node_id, start)
            .then(
                fallback => {
                    console.log('Return: ', fallback);
                    this.getQuestionList();
                    this.userVarChange = false;
                    this.onBack();
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);

    }

    deleteQuestion() {
        this.Loading();
        //this.questionList.splice(this.questionList.indexOf(this.selectedQuestion), 1);
        this._editorService.deleteQuestion(this.selectedQuestion)
            .then(
                fallback => {
                    console.log('Return: ', fallback);
                    this.getQuestionList();
                    this.Loaded();
                },
                error => this.errorMessage = <any>error);
    }

    onBack() {
        this.newQuestion = false;
        this.router.navigate(['../question_editor', this._editorService.version]);
    }

    ngOnChanges() {
        //this.getRules(this.selectedQuestion.id);
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.chatVersion = this._editorService.version;
            this.selectedQuestion = +params['id']; // (+) converts string 'id' to a number
            if (params['id'] != 'new') {
                this.getQuestion();
            }
            else {
                this.newQuestion = true;
                this.getQuestionList();
                this.getAllVariables();
            }

        });
        // this.getQuestion();
    }
}
/**
 * Created by Dmitry1 on 02.02.2017.
 */
