/**
 * Created by dmitry on 22.12.16.
 */
import {Component, OnInit, Directive} from '@angular/core';
import {ReportService} from '../service/report.service'
import {Report} from '../class/report'


@Component({
    selector: 'report',
    templateUrl: 'report-component.html',
})

export class ReportComponent implements OnInit {
    reportList: Report[];
    errorMessage: string;

    constructor(private _reportService: ReportService) {
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
                    console.log(this.reportList);
                    this.Loaded();
                },
                error => this.errorMessage = <any>error
            );
    }

    ngOnInit(){
        this.getReports();
    }
}