/**
 * Created by User on 12.12.2016.
 */
import {Component, OnInit} from '@angular/core';
import { QuestionList } from '../class/questionList'

export const QUESTIONS: QuestionList[] = [
    {id: 1, text: "Question 1", start: true},
    {id: 2, text: "Question 2", start: false},
    {id: 3, text: "Question 3", start: false},
    {id: 4, text: "Question 4", start: false},
    {id: 5, text: "Question 5", start: false}];

@Component({
    selector: 'editor',
    templateUrl: 'editor-component.html',
})

export class EditorComponent implements OnInit {
    questionList: QuestionList[] = QUESTIONS;
    ngOnInit() {
        console.log('123123');
    }
}