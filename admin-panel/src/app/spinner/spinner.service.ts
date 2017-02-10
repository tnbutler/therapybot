import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { Observable } from "rxjs/Rx";

@Injectable()
export class SpinnerService {
    public status: Subject <any> = new Subject<any>( ) ;
    private _active: any = {};

    public quitDialogResult = new Subject<boolean>();
    public yesDialogResult = new Subject<boolean>();



    public get active(): any {
        return this._active;
    }

    public set active(v: any) {
        if (v!= this._active) {
            this._active = v;
            this.status.next(v);
        }
    }

    public start(): void {
        this.active = { spinner: true};
    }

    public stop(): void {
        this.active = { spinner: false };
    }

    public showMessage(message:string,header ='Info') {
        this.active = { message: { header:header , content: message }};
    }

    public quitDialog(): Observable <boolean>  {
        this.active = { quitDialog: true }; // message: {header: 'Are you sure?', content: 'Data has changes!'} }
        return this.quitDialogResult.asObservable();
    }

    public yesDialog(header,content): Observable <boolean>  {
        this.active = { yesDialog: true , header: header, content: content} ;
        return this.yesDialogResult.asObservable();
    }


}