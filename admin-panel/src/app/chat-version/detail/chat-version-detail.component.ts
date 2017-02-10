import {
    Component,
    ViewEncapsulation,
    ViewChild,
    Output,
    EventEmitter
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, FormArray} from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";

import {NgZone} from '@angular/core';

import {ChatVersionService}   from "../chat-version.service";
import {BaseDetail}  from '../../auth/base-detail';

@Component({
    selector: 'chat-version-detail',

    styleUrls: ['chat-version-detail.style.scss'],
    templateUrl: 'chat-version-detail.template.html',

    encapsulation: ViewEncapsulation.None,
//  host: {
//    class: 'error-page app'
//  },
})
export class ChatVersionDetail extends BaseDetail {

    constructor(protected route: ActivatedRoute, protected chatVersionService: ChatVersionService) {
        super(route, chatVersionService);
    }


    // PHOTO  -------------------------------------------------------------------------------------------

    @ViewChild('upload_hidden') upload_hidden;  // photo

    private zone: NgZone;
//    private options: Object;
    private progress: number = 0;
    private response: any = {};

    onImageLoaded($event) {
        //console.log($event);
        this.baseService.authService.spinnerStop();
    }


    ngOnInit() {
        super.ngOnInit();

        this.zone = new NgZone({enableLongStackTrace: false});
    }

    uploadOptions() {
        let opt: any = this.baseService.authService.uploadOptions();
        opt.calculateSpeed = true;
        return opt;
    }

    handleUpload(data: any): void {
//        this.userService.authService.spinnerStart();
        this.zone.run(() => {

            this.response = data;
            //this.progress = Math.floor(data.progress.percent / 100);
            this.progress = data.progress.percent;
            //console.log(data.progress);
            if (data && data.response) {
                console.log(data);
                data = JSON.parse(data.response);
                let link = data.src;

                console.log('uploaded', link);
                this.item.photo = link;
            }

        });
    }

    beforeUpload($event) {
        this.baseService.authService.spinnerStart();
    }

    onUploadRejected($event) {
        this.baseService.authService.spinnerStop();
        this.baseService.authService.showError('Upload rejected')
    }


    loadPhoto() {
        this.upload_hidden.nativeElement.click();
    }

    clearPhoto() {
        this.item.photo = '';
    }


    //------------------------------------------------------------------------------------------------------------

    onBack() {
        this.back();
    }

    selectedColor(state: boolean) {
        if (state == true) {
            return '#b8f3b8'; //"CBF08B";
        }
    }
}
