/**
 * Created by User on 12.12.2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionEditorService} from '../question-editor.service';
import {Question} from '../question.class'

@Component({
    selector: 'question-editor',
    styleUrls: ['question-editor.style.scss'],
    templateUrl: 'question-editor.template.html',
})

export class QuestionEditorComponent implements OnInit {
    questionList: any[];
    sysVarsList: any[];
    dictList: any[];
    rulesList: any[];
    rule: any;
    question: Question = new Question();
    chatVersion: number;
    chatName: string = '';
    private sub: any;

    selectedQuestion: any;
    hiddenRule: boolean = true;

    errorMessage: string;


    constructor(private _editorService: QuestionEditorService,
                private route: ActivatedRoute) {
        console.log(this._editorService.selectedChat)
        this.chatName = this._editorService.selectedChat;
    }

    Color(state: string, id: number) {
        if (state == '1')
            return "#b8f3b8";//"CBF08B";
        if (this.selectedQuestion) {
            if (id == this.selectedQuestion.id)
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

    getQuestionList() {
        this.Loading();
        this._editorService.getQuestions(this.chatVersion)
            .then(
                questions => {
                    console.log('Received questions: ', questions);
                    this.questionList = questions;
                    this._editorService.lastQuestionId = this.questionList.length;
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
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

    selectQuestion(){
        this._editorService.selectedQuestionId = this.selectedQuestion.id;
    }


    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.chatVersion = +params['id']; // (+) converts string 'id' to a number
            this._editorService.version = this.chatVersion;
        });
        if (this.chatVersion) {
            this.getQuestionList();
        }
    }
}