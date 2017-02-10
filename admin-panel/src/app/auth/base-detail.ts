/**
 * Created by Alexander Spazhev on 31.10.2016.
 */

import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {ParsleyForm} from './parsley-form'
import {BaseService} from './base.service';

export class BaseDetail extends ParsleyForm {

    protected item:any = {};
    protected error: any = '';
    protected isLoaded: boolean = false;
    public paramItems: any = {};

    private _busy: boolean = false;


    protected savedItem:any = {};
    protected noChanges: boolean = false;

    constructor(protected route: ActivatedRoute,protected baseService: BaseService) {
        super();
    }


    canDeactivate() {
        return true;
    }

    get busy():boolean {
        return this._busy;
    }

    set busy(val:boolean) {
        this._busy = val;
    }

    lookupName(arr,id) {
        return this.baseService.lookupName(arr,id);
    }

    backLink() {
        //if (this.item.id){ return ['../', {id: this.item.id}] }
        return ['../'];
    }

    onBack() {
        this.baseService.authService.router.navigate(this.backLink(), {relativeTo: this.route});
/*
        if (this.item.id) {
            this.baseService.authService.router.navigate(['../', {id: this.item.id}], {relativeTo: this.route});
        }
        else {
            this.baseService.authService.router.navigate(['../'], {relativeTo: this.route});
        }*/
    }

    handleRead(result) {
        this.onReadItem(result);
        this.item = result;
    }

//---------------------------------------------------------------------------------------------------------

    isadmin():boolean {
        return this.baseService.authService.isadmin();
    }

//-----------------------------------------------------------------------------------------------------------

    equal(a,b) {
        if (a) {
            if (b) return (a==b);
            return false;
        }

        if (b) return false;
        return true;
    }


    public hasChanges() {

        if (this.noChanges) return false;

        let changedItem = this.itemToSave();

        for (let key in changedItem) {
            if (key=='updated_at') continue;

            if (!this.equal(this.savedItem[key],changedItem[key])) {

                //console.log(key);
                //console.log(this.savedItem[key]);
                //console.log(changedItem[key]);

                return true;
            }
        }

        for (let key in this.savedItem) {
            if (key=='updated_at') continue;

            if (!this.equal(this.savedItem[key],changedItem[key])) {

                return true;
            }
        }

        return false;
    }


    itemToSave() {
        let save_item = {};
        for (let key in this.item) {  //.filter
            if (!key.startsWith('_')) {
                save_item[key] = this.item[key];
            }
        }
        this.onWriteItem(save_item);

        return save_item;
    }



    onDelete() {
        if (this.busy) return;
        this.busy = true;
        if (this.item.id){
            this.baseService.delete(this.item.id)
                .subscribe(
                result => { this.busy = false; this.item = {}; this.onBack()},
                error =>  { this.busy = false; this.error = error});

        }
    }

    detailId() {
        return this.route.snapshot.params['id'];
    }

    getDetail() {

        let id = this.detailId();
        if (!isNaN(id) && (id >= 0)) {
            this.baseService.getItem(id,this.paramItems)
                .subscribe(
                    result => {
                        this.handleRead(result);
                        this.savedItem = this.itemToSave();
                        this.isLoaded = true;
                        console.log(result);
                    },

                    error =>  this.error = error)
        }
        else
          {this.isLoaded = true};

    }


    ngOnInit():void {

        super.ngOnInit();

        this.getDetail();
    }

    onReadItem(result) { }

    onItemLoaded() {}

    onWriteItem(result) {}

    //---------------------------------------------------------------------------------------------------------

    onSubmitAndBack() {
        if (this.isValid()) this.onSave();
    }

    //----------------------------------------------------------------------------------------------------------


    back() {
        this.baseService.authService.back();
    }

    saveAndBack() {

        if (!this.isValid()) return;

        if (this.busy) return;
        this.busy = true;

        let save_item = this.itemToSave();

        this.baseService.post(save_item)
            .subscribe(
                result => {
                    this.busy = false;
                    this.noChanges = true;
                    this.back()
                },
                error =>  { this.busy = false; this.baseService.authService.showError(error); this.error = error}
        );

    }

    onSave(){
        if (this.busy) return;
        this.busy = true;

        let save_item = this.itemToSave();

        this.baseService.post(save_item)
            .subscribe(
                result => {
                    this.busy = false;
                    this.handleRead(result);
                    this.savedItem = this.itemToSave();
                    this.onBack()},
                error =>  { this.busy = false; this.baseService.authService.showError(error); this.error = error}
        );
    }


    saveItem(){
        if (this.busy) return;
        this.busy = true;

        let save_item = this.itemToSave();

        this.baseService.post(save_item)
            .subscribe(
                result => {

                this.busy = false;
                this.handleRead(result);
                this.savedItem = this.itemToSave();
                this.isLoaded = true;
                this.onItemLoaded();
            },
                error =>  { this.busy = false; this.baseService.authService.showError(error); this.error = error}
        );
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////


}