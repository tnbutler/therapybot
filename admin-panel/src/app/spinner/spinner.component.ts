import {Component,ViewChild} from '@angular/core';
import {SpinnerService} from './spinner.service';

@Component({
    selector: 'spinner',
    styleUrls: ['spinner.component.css'],
    //I'm using in modal-backdrop classes from bootstrap
    template:
        ` <div *ngIf="spinner" class="spinner loading">
        <div class="in modal-backdrop spinner-overlay"></div>
     <div class="spinner-message-container" aria-live="assertive" aria-atomic="true">
        <div class="spinner-message" [ngClass]="spinnerMessageClass">{{ state.message }}</div>
    </div></div>

       <modal #info  (onClose) = "onInfoClose()" [hideCloseButton]="false"
          >
          <modal-header>
             <h1>{{modalHeader}}</h1>
          </modal-header>
          <modal-content>
                {{modalContent}}
          </modal-content>
          <modal-footer>
              <button class="btn btn-default btn-rounded" (click)="info.close()">Close</button>
          </modal-footer>
        </modal>

       <modal #quitDialog  (onClose) = "quitDialogClose()" [hideCloseButton]="false"
          >
          <modal-header>
             <h1>Are you sure ?</h1>
          </modal-header>
          <modal-content>
               Data has changed
          </modal-content>
          <modal-footer>
              <button class="btn btn-primary btn-rounded pull-xs-left" (click)="quitDialog.close()">Cancel</button>
              <button class="btn btn-primary btn-rounded" (click)="quitDialogOk()">Quit anyway</button>
          </modal-footer>
        </modal>

       <modal #yesDialog  (onClose) = "yesDialogClose()" >
          <modal-header>
             <h1>{{modalHeader}}</h1>
          </modal-header>
          <modal-content>
                {{modalContent}}
          </modal-content>
          <modal-footer>
              <button class="btn btn-primary btn-rounded pull-xs-left" (click)="yesDialog.close()">Cancel</button>
              <button class="btn btn-primary btn-rounded" (click)="yesDialogOk()">Yes</button>
          </modal-footer>
        </modal>

    `
})
export class SpinnerComponent {

    @ViewChild ('info') info: any;
    @ViewChild('quitDialog') quitDialog;
    @ViewChild('yesDialog') yesDialog;

    state = {
        message: 'Please wait...'
    };


    public spinner: boolean = false;

    modalHeader: string = '';
    modalContent: string = '';


    quitResult: boolean = false;


    onInfoClose() {
        //console.log('onInfoClose');
    }

    quitDialogClose() {
        //console.log('quitDialogClose');
        if (this.quitResult) {
            this.quitResult = false;
        }
        else {
            this.spinnerService.quitDialogResult.next(false);
        }
    }
    quitDialogOk() {
        //console.log('quitDialogOk');
        this.quitResult = true;
        this.spinnerService.quitDialogResult.next(true);
        this.quitDialog.close();
    }

    //-----------------------------------------------------------------------------------------

    yesResult: boolean = false;

    yesDialogClose() {
        if (this.yesResult) {
            this.yesResult = false;
        }
        else {
            this.spinnerService.yesDialogResult.next(false);
        }
    }

    yesDialogOk() {
        this.yesResult = true;
        this.spinnerService.yesDialogResult.next(true);
        this.yesDialog.close();
    }




    public constructor(private spinnerService: SpinnerService) {

        spinnerService.status.subscribe((status: any) => {

            this.spinner = status.spinner;
            if (status.message) {
                this.modalHeader = status.message.header;
                this.modalContent = status.message.content;
                this.info.open();
            }
            else {
                this.info.close();
            }

            this.quitResult = false;
            if (status.quitDialog) {
                this.quitDialog.open();
            }
            else {
                this.quitDialog.close();
            }

            this.yesResult = false;
            if (status.yesDialog) {
                this.modalHeader = status.header;
                this.modalContent = status.content;
                this.yesDialog.open();
            }
            else {
                this.yesDialog.close();
            }



        });



    }



}