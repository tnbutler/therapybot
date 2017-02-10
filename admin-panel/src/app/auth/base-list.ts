/**
 * Created by Alexander Spazhev on 30.10.2016.
 */
import { ViewChild } from '@angular/core';
import {Http, Response} from '@angular/http';

import { FormControl } from '@angular/forms';

import {BaseService} from './base.service';


export class BaseList {

    protected serviceItems:any = {paging: true,  maxSize: 5, };

    public paramItems: any = {};

    protected data:any[] = [];
    numPages: number = 1;   // ??? from pagination ex.

    protected searchControl = new FormControl();

    pageFirstEnabled: boolean = false;
    pagePrevEnabled: boolean = false;
    pageNextEnabled: boolean = false;
//    pageLastEnabled: boolean = false;

    @ViewChild('pageFirstLink') pageFirstLink: any;
/*
    @ViewChild('pagePrevLink')  pagePrevLink: any;

    @ViewChild('pageNextLink')  pageNextLink: any;
    @ViewChild('pageLastLink')  pageNextLink: any;
    */


    constructor(protected baseService:BaseService) {

        this.searchControl.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(term => {
                this.serviceItems.filter = term;
                this.serviceItems.page = 1;
                this.getList();
            });

    }

    addLink() {
        return ['0']
    }

    onPageChange(config: any, page: any = {page: this.serviceItems.page, itemsPerPage: this.serviceItems.per_page}): any {

        console.log('onPageChange',this.serviceItems.page);
        this.serviceItems.page = page.page;
        this.getList();
    }

    pageChanged() {
        console.log('pageChanged',this.serviceItems.page);
        this.getList();
    }

    onReadParams(params) {}

    onReadItems(result) {}

    getList() {
        this.onReadParams(this.paramItems);
        this.baseService.getItems(this.serviceItems,this.paramItems)
            .subscribe(
                result => {

                this.data = result.data;
                this.serviceItems.page = result.current_page;
                this.serviceItems.total = result.total;
                this.serviceItems.to = result.to;
                this.serviceItems.from = result.from;
                this.serviceItems.last_page = result.last_page;
                this.serviceItems.per_page = result.per_page;
                // this.serviceItems.current_page = result.current_page;
                this.enablePages();
                this.onReadItems(result);
            },
                error => { this.serviceItems.error = error; this.handleError(error); }
        );

    }


//-----------------------------------------------------------------------------------------------------------

    showFromTo() {
        if (this.serviceItems) {
            if (this.serviceItems.total > 0) {
                return `Showing ${this.serviceItems.from} - ${this.serviceItems.to} of ${this.serviceItems.total}`;
            }
        }
        return 'No matches';
    }

    showFromToNo() {
        if (this.serviceItems) {
            if (this.serviceItems.total > 0) {
                return `Showing ${this.serviceItems.from} - ${this.serviceItems.to} of ${this.serviceItems.total}`;
            }
        }
        return 'No';
    }



    enablePages() {
        this.pageFirstEnabled = (this.serviceItems.page > 1);
        this.pagePrevEnabled = (this.serviceItems.page > 1);
        this.pageNextEnabled = (this.serviceItems.page < this.serviceItems.last_page);
//        this.pageLastEnabled = (this.serviceItems.page < this.serviceItems.last_page);

        if (this.pageFirstLink) {this.pageFirstLink.disabled = !this.pageFirstEnabled};
    }

    pageFirst() {
        this.serviceItems.page = 1;
        this.getList();
    }

    pagePrev() {
        if (this.serviceItems.page > 1) {
            this.serviceItems.page =this.serviceItems.page -1;
            this.getList();
        }
    }

    pageNext() {
        if (this.serviceItems.page < this.serviceItems.last_page) {
            this.serviceItems.page =this.serviceItems.page + 1;
            this.getList();
        }
    }

    pageLast() {
        this.serviceItems.page = this.serviceItems.last_page;
        this.getList();
    }

    pageLastEnabled() {
        return this.serviceItems.page < this.serviceItems.last_page;
    }


    //-----------------------------------------------------------------------------------------------------------

    handleError (error: Response) {
        this.baseService.authService.showError(error);
    }
    //-----------------------------------------------------------------------------------------------------------

    updateSearchControl() {

        if (this.searchControl && this.searchControl.value != '') {
            this.searchControl.setValue('');
        }
        else {
            this.serviceItems.filter = '';
            this.serviceItems.page = 1;
            this.getList();
        }

    }

    refresh() {
        this.updateSearchControl();
        //this.getList();
    }

    ngOnInit() {

        this.getList();
    }

}