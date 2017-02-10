/**
 * Created by dmitry on 22.12.16.
 */
import {Component, OnInit} from '@angular/core';
import {ChatReportService} from '../chat-report.service'

@Component({
    selector: 'chat-report',

    styleUrls: [ 'chat-report.style.scss' ],
    templateUrl: 'chat-report.template.html',
})

export class ChatReportComponent{
    reportList: any[];
    varsList: any[] = [];
    varList: any[] = [[]];
    ansList: any[] = [];
    errorMessage: string;
    i = 0;

    array: any[] = [];
    arr: any[] = [];

    ready: boolean = false;

    constructor(private _reportService: ChatReportService) {
    }

    Loading() {
        document.getElementById("loader").style.display = "block";
        document.getElementById("main").style.display = "none";
    }

    Loaded() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").style.display = "block";
    }

    getReports() {
        this.Loading();
        this._reportService.getReports()
            .then(
                reports => {
                    console.log('Received questions: ', reports);
                    this.reportList = reports;
                    this.toArr();
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
    }

    toArr(){
        for(let elem in this.reportList){

        }
    }
/*
    toArr() {
        for(let elem in this.reportList){
            this.varsList = this.reportList[elem].VARS;
            if(Array.isArray(this.reportList[elem].VARS)) this.varList.push('####')
            else {
                for(let vars in this.varsList){
                    this.varList[this.i].push(vars);
                }
            }
            this.i++;
        }
        console.log(this.varList);
    }
*/
    onReadItems(result) {
        this.varsList.length = 0;
        for (let elem in result) {
            this.varsList.push([elem, result[elem]])
            this.ready = true;
        }
        console.log('Items: ',this.varsList);
    }

    ngOnInit(){
        this.getReports();
    }
}